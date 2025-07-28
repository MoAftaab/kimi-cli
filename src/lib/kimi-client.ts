import { OpenAI } from 'openai';
import chalk from 'chalk';
import ora from 'ora';
import { Config } from '../utils/config.js';
import { Logger } from '../utils/logger.js';

export interface KimiMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface KimiResponse {
  content: string;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
  model: string;
  timestamp: Date;
}

export class KimiClient {
  private client: OpenAI;
  private config: Config;
  private logger: Logger;

  constructor() {
    this.config = new Config();
    this.logger = new Logger();
    
    const apiKey = this.config.get('apiKey') || process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        chalk.red('❌ API key not found. Please run ') +
        chalk.yellow('kimi config set-key') +
        chalk.red(' to set your OpenRouter API key.')
      );
    }

    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': 'https://github.com/MoAftaab/kimi-cli',
        'X-Title': 'Kimi CLI'
      }
    });
  }

  async chat(
    messages: KimiMessage[],
    options: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
      stream?: boolean;
    } = {}
  ): Promise<KimiResponse> {
    const spinner = ora('🤖 Kimi is thinking...').start();
    
    try {
      const {
        model = 'moonshotai/kimi-k2:free',
        maxTokens = 4000,
        temperature = 0.7,
        stream = false
      } = options;

      this.logger.debug('Sending request to Kimi AI', {
        model,
        messageCount: messages.length,
        maxTokens,
        temperature
      });

      const response = await this.client.chat.completions.create({
        model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        max_tokens: maxTokens,
        temperature,
        stream
      });

      spinner.stop();

      if ('choices' in response && response.choices && response.choices.length > 0) {
        const choice = response.choices[0];
        const usage = response.usage;

        return {
          content: choice.message?.content || '',
          tokens: {
            prompt: usage?.prompt_tokens || 0,
            completion: usage?.completion_tokens || 0,
            total: usage?.total_tokens || 0
          },
          model,
          timestamp: new Date()
        };
      }

      throw new Error('Invalid response from Kimi AI - no choices found');
    } catch (error) {
      spinner.stop();
      this.logger.error('Failed to get response from Kimi AI', error);
      throw error;
    }
  }

  async getModels(): Promise<string[]> {
    try {
      // Kimi models available through OpenRouter
      return [
        'moonshotai/kimi-k2:free',
        'moonshotai/moonshot-v1-8k',
        'moonshotai/moonshot-v1-32k',
        'moonshotai/moonshot-v1-128k'
      ];
    } catch (error) {
      this.logger.error('Failed to fetch models', error);
      return ['moonshotai/kimi-k2:free'];
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const testClient = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
        defaultHeaders: {
          'HTTP-Referer': 'https://github.com/MoAftaab/kimi-cli',
          'X-Title': 'Kimi CLI'
        }
      });

      const response = await testClient.chat.completions.create({
        model: 'moonshotai/kimi-k2:free',
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 5
      });

      return !!response.choices[0]?.message?.content;
    } catch (error) {
      return false;
    }
  }
}
