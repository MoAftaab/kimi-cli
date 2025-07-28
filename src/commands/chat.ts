import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';
import { KimiClient, KimiMessage } from '../lib/kimi-client.js';
import { Config } from '../utils/config.js';
import { Logger } from '../utils/logger.js';
import { ChatHistory } from '../utils/chat-history.js';

export class ChatCommand {
  private kimiClient: KimiClient;
  private config: Config;
  private logger: Logger;
  private chatHistory: ChatHistory;

  constructor(kimiClient: KimiClient) {
    this.kimiClient = kimiClient;
    this.config = new Config();
    this.logger = new Logger();
    this.chatHistory = new ChatHistory();
  }

  register(program: Command): void {
    program
      .command('chat')
      .alias('c')
      .description('🗣️  Start an interactive chat session with Kimi AI')
      .option('-m, --model <model>', 'Model to use for chat')
      .option('-t, --temperature <temp>', 'Temperature for responses (0-2)', parseFloat)
      .option('--max-tokens <tokens>', 'Maximum tokens for response', parseInt)
      .option('--system <message>', 'System message to set context')
      .action(async (options) => {
        await this.run(options);
      });

    program
      .command('ask')
      .alias('a')
      .description('💬 Ask a single question to Kimi AI')
      .argument('<question>', 'Question to ask Kimi AI')
      .option('-m, --model <model>', 'Model to use')
      .option('-t, --temperature <temp>', 'Temperature for responses (0-2)', parseFloat)
      .option('--max-tokens <tokens>', 'Maximum tokens for response', parseInt)
      .action(async (question, options) => {
        await this.askSingle(question, options);
      });
  }

  async run(options: any): Promise<void> {
    try {
      console.log(
        boxen(
          chalk.cyan('🤖 Welcome to Kimi AI Chat!') + '\n\n' +
          chalk.gray('Type your message and press Enter to chat.') + '\n' +
          chalk.gray('Type "exit" or "quit" to end the session.') + '\n' +
          chalk.gray('Type "clear" to clear chat history.') + '\n' +
          chalk.gray('Type "save" to save current conversation.'),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan'
          }
        )
      );

      const messages: KimiMessage[] = [];

      // Add system message if provided
      if (options.system) {
        messages.push({
          role: 'system',
          content: options.system,
          timestamp: new Date()
        });
      }

      let conversationActive = true;

      while (conversationActive) {
        const { userInput } = await inquirer.prompt([
          {
            type: 'input',
            name: 'userInput',
            message: chalk.cyan('You:'),
            prefix: '💭'
          }
        ]);

        const input = userInput.trim();

        if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
          conversationActive = false;
          console.log(chalk.yellow('👋 Goodbye! Thanks for using Kimi CLI!'));
          break;
        }

        if (input.toLowerCase() === 'clear') {
          messages.length = 0;
          console.clear();
          console.log(chalk.green('✅ Chat history cleared!'));
          continue;
        }

        if (input.toLowerCase() === 'save') {
          const sessionId = await this.chatHistory.saveSession(messages);
          console.log(chalk.green(`✅ Conversation saved with ID: ${sessionId}`));
          continue;
        }

        if (!input) {
          console.log(chalk.yellow('⚠️  Please enter a message.'));
          continue;
        }

        // Add user message
        messages.push({
          role: 'user',
          content: input,
          timestamp: new Date()
        });

        try {
          const response = await this.kimiClient.chat(messages, {
            model: options.model || this.config.get('defaultModel'),
            temperature: options.temperature || this.config.get('temperature'),
            maxTokens: options.maxTokens || this.config.get('maxTokens')
          });

          // Add assistant response
          messages.push({
            role: 'assistant',
            content: response.content,
            timestamp: response.timestamp
          });

          // Display response with beautiful formatting
          console.log(
            boxen(
              chalk.white(response.content),
              {
                padding: 1,
                margin: { top: 1, bottom: 1, left: 0, right: 0 },
                borderStyle: 'round',
                borderColor: 'green',
                title: '🤖 Kimi AI',
                titleAlignment: 'left'
              }
            )
          );

          // Show token usage
          console.log(
            chalk.dim(
              `📊 Tokens: ${response.tokens.total} (prompt: ${response.tokens.prompt}, completion: ${response.tokens.completion})`
            )
          );

        } catch (error) {
          this.logger.error('Failed to get response from Kimi AI', error);
        }
      }

    } catch (error) {
      this.logger.error('Chat session failed', error);
    }
  }

  async askSingle(question: string, options: any): Promise<void> {
    try {
      const messages: KimiMessage[] = [
        {
          role: 'user',
          content: question,
          timestamp: new Date()
        }
      ];

      const response = await this.kimiClient.chat(messages, {
        model: options.model || this.config.get('defaultModel'),
        temperature: options.temperature || this.config.get('temperature'),
        maxTokens: options.maxTokens || this.config.get('maxTokens')
      });

      console.log(
        boxen(
          chalk.cyan('Question: ') + chalk.white(question) + '\n\n' +
          chalk.green('Answer: ') + chalk.white(response.content),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan',
            title: '🤖 Kimi AI Response',
            titleAlignment: 'center'
          }
        )
      );

      console.log(
        chalk.dim(
          `📊 Tokens: ${response.tokens.total} | Model: ${response.model}`
        )
      );

    } catch (error) {
      this.logger.error('Failed to get response from Kimi AI', error);
    }
  }
}
