import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { Config } from '../utils/config.js';
import { KimiClient } from '../lib/kimi-client.js';
import { Logger } from '../utils/logger.js';

export class ConfigCommand {
  private config: Config;
  private logger: Logger;

  constructor() {
    this.config = new Config();
    this.logger = new Logger();
  }

  register(program: Command): void {
    const configCmd = program
      .command('config')
      .description('⚙️  Manage Kimi CLI configuration');

    configCmd
      .command('set-key')
      .description('🔑 Set your OpenRouter API key')
      .option('-k, --key <key>', 'API key to set')
      .action(async (options) => {
        await this.setApiKey(options.key);
      });

    configCmd
      .command('show')
      .description('📋 Show current configuration')
      .action(() => {
        this.config.printConfig();
      });

    configCmd
      .command('set')
      .description('⚙️  Set configuration values')
      .argument('<key>', 'Configuration key')
      .argument('<value>', 'Configuration value')
      .action((key, value) => {
        this.setConfig(key, value);
      });

    configCmd
      .command('get')
      .description('📖 Get configuration value')
      .argument('<key>', 'Configuration key')
      .action((key) => {
        this.getConfig(key);
      });

    configCmd
      .command('reset')
      .description('🔄 Reset configuration to defaults')
      .action(async () => {
        await this.resetConfig();
      });
  }

  private async setApiKey(providedKey?: string): Promise<void> {
    try {
      let apiKey = providedKey;

      if (!apiKey) {
        const { key } = await inquirer.prompt([
          {
            type: 'password',
            name: 'key',
            message: 'Enter your OpenRouter API key:',
            mask: '*',
            validate: (input) => {
              if (!input.trim()) {
                return 'API key cannot be empty';
              }
              if (!input.startsWith('sk-or-')) {
                return 'Invalid OpenRouter API key format. Should start with "sk-or-"';
              }
              return true;
            }
          }
        ]);
        apiKey = key;
      }

      // Validate the API key
      console.log(chalk.cyan('🔍 Validating API key...'));
      const tempClient = new KimiClient();
      const isValid = await tempClient.validateApiKey(apiKey!);

      if (!isValid) {
        this.logger.error('Invalid API key. Please check your key and try again.');
        return;
      }

      this.config.set('apiKey', apiKey);
      this.logger.success('API key set successfully! 🎉');

    } catch (error) {
      this.logger.error('Failed to set API key', error);
    }
  }

  private setConfig(key: string, value: string): void {
    try {
      // Parse value based on type
      let parsedValue: any = value;

      if (value === 'true' || value === 'false') {
        parsedValue = value === 'true';
      } else if (!isNaN(Number(value))) {
        parsedValue = Number(value);
      }

      this.config.set(key, parsedValue);
      console.log(
        chalk.green('✅ Configuration updated: ') +
        chalk.yellow(key) +
        chalk.gray(' = ') +
        chalk.cyan(String(parsedValue))
      );

    } catch (error) {
      this.logger.error('Failed to set configuration', error);
    }
  }

  private getConfig(key: string): void {
    try {
      const value = this.config.get(key);
      
      if (value === undefined) {
        console.log(chalk.yellow(`⚠️  Configuration key "${key}" not found`));
        return;
      }

      if (key === 'apiKey') {
        console.log(chalk.yellow(key) + chalk.gray(': ') + chalk.green('***hidden***'));
      } else {
        console.log(chalk.yellow(key) + chalk.gray(': ') + chalk.green(String(value)));
      }

    } catch (error) {
      this.logger.error('Failed to get configuration', error);
    }
  }

  private async resetConfig(): Promise<void> {
    try {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Are you sure you want to reset all configuration to defaults?',
          default: false
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('❌ Configuration reset cancelled'));
        return;
      }

      this.config.clear();
      this.logger.success('Configuration reset to defaults! 🔄');

    } catch (error) {
      this.logger.error('Failed to reset configuration', error);
    }
  }
}
