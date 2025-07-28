import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import { ChatHistory } from '../utils/chat-history.js';
import inquirer from 'inquirer';

export class HistoryCommand {
  private chatHistory: ChatHistory;

  constructor() {
    this.chatHistory = new ChatHistory();
  }

  register(program: Command): void {
    const historyCmd = program
      .command('history')
      .alias('h')
      .description('📚 Manage chat history');

    historyCmd
      .command('list')
      .description('📋 List all chat sessions')
      .action(async () => {
        await this.listSessions();
      });

    historyCmd
      .command('show')
      .description('👀 Show a specific chat session')
      .argument('<sessionId>', 'Session ID to show')
      .action(async (sessionId) => {
        await this.showSession(sessionId);
      });

    historyCmd
      .command('delete')
      .description('🗑️  Delete a chat session')
      .argument('<sessionId>', 'Session ID to delete')
      .action(async (sessionId) => {
        await this.deleteSession(sessionId);
      });

    historyCmd
      .command('clear')
      .description('🧹 Clear all chat history')
      .action(async () => {
        await this.clearHistory();
      });
  }

  private async listSessions(): Promise<void> {
    try {
      const sessions = await this.chatHistory.listSessions();
      this.chatHistory.printSessions(sessions);
    } catch (error) {
      console.error(chalk.red('❌ Failed to load chat history'));
    }
  }

  private async showSession(sessionId: string): Promise<void> {
    try {
      const session = await this.chatHistory.loadSession(sessionId);
      
      if (!session) {
        console.log(chalk.yellow(`⚠️  Session "${sessionId}" not found`));
        return;
      }

      console.log(
        boxen(
          chalk.cyan('💬 Chat Session: ') + chalk.white(session.title) + '\n' +
          chalk.gray(`ID: ${session.id}`) + '\n' +
          chalk.gray(`Created: ${new Date(session.createdAt).toLocaleString()}`) + '\n' +
          chalk.gray(`Messages: ${session.messages.length}`),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan'
          }
        )
      );

      session.messages.forEach((message, index) => {
        const timestamp = new Date(message.timestamp || '').toLocaleTimeString();
        const role = message.role === 'user' ? '👤 You' : '🤖 Kimi';
        const color = message.role === 'user' ? 'cyan' : 'green';

        console.log(
          chalk[color](`\n${role} (${timestamp}):`)
        );
        console.log(chalk.white(message.content));
        
        if (index < session.messages.length - 1) {
          console.log(chalk.gray('─'.repeat(50)));
        }
      });

    } catch (error) {
      console.error(chalk.red('❌ Failed to load session'));
    }
  }

  private async deleteSession(sessionId: string): Promise<void> {
    try {
      const session = await this.chatHistory.loadSession(sessionId);
      
      if (!session) {
        console.log(chalk.yellow(`⚠️  Session "${sessionId}" not found`));
        return;
      }

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to delete session "${session.title}"?`,
          default: false
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('❌ Deletion cancelled'));
        return;
      }

      const success = await this.chatHistory.deleteSession(sessionId);
      
      if (success) {
        console.log(chalk.green('✅ Session deleted successfully'));
      } else {
        console.log(chalk.red('❌ Failed to delete session'));
      }

    } catch (error) {
      console.error(chalk.red('❌ Failed to delete session'));
    }
  }

  private async clearHistory(): Promise<void> {
    try {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Are you sure you want to clear ALL chat history? This cannot be undone.',
          default: false
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('❌ Clear operation cancelled'));
        return;
      }

      await this.chatHistory.clearAllSessions();
      console.log(chalk.green('✅ All chat history cleared'));

    } catch (error) {
      console.error(chalk.red('❌ Failed to clear history'));
    }
  }
}
