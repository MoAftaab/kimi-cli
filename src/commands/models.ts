import { Command } from 'commander';
import chalk from 'chalk';
import Table from 'cli-table3';
import { KimiClient } from '../lib/kimi-client.js';

export class ModelsCommand {
  private kimiClient: KimiClient;

  constructor(kimiClient: KimiClient) {
    this.kimiClient = kimiClient;
  }

  register(program: Command): void {
    program
      .command('models')
      .alias('m')
      .description('🎯 List available Kimi AI models')
      .action(async () => {
        await this.listModels();
      });
  }

  private async listModels(): Promise<void> {
    try {
      console.log(chalk.cyan('🎯 Available Kimi AI Models:\n'));

      const table = new Table({
        head: [
          chalk.cyan('Model'),
          chalk.cyan('Context'),
          chalk.cyan('Type'),
          chalk.cyan('Description')
        ],
        colWidths: [30, 12, 10, 40]
      });

      const modelInfo = [
        {
          name: 'moonshotai/kimi-k2:free',
          context: '8K tokens',
          type: 'Free',
          description: 'Free tier model with basic capabilities'
        },
        {
          name: 'moonshotai/moonshot-v1-8k',
          context: '8K tokens',
          type: 'Paid',
          description: 'Standard model with 8K context window'
        },
        {
          name: 'moonshotai/moonshot-v1-32k',
          context: '32K tokens',
          type: 'Paid',
          description: 'Extended context model for longer conversations'
        },
        {
          name: 'moonshotai/moonshot-v1-128k',
          context: '128K tokens',
          type: 'Paid',
          description: 'Maximum context model for complex tasks'
        }
      ];

      modelInfo.forEach(model => {
        const typeColor = model.type === 'Free' ? chalk.green : chalk.yellow;
        table.push([
          chalk.white(model.name),
          chalk.blue(model.context),
          typeColor(model.type),
          chalk.gray(model.description)
        ]);
      });

      console.log(table.toString());

      console.log(
        '\n' + chalk.cyan('💡 Usage Tips:') + '\n' +
        chalk.gray('• Use -m or --model flag to specify a model') + '\n' +
        chalk.gray('• Free model has rate limits and basic features') + '\n' +
        chalk.gray('• Paid models offer better performance and higher limits') + '\n' +
        chalk.gray('• Choose context size based on your conversation length') + '\n'
      );

      console.log(
        chalk.yellow('🔗 Get API key: ') + chalk.blue('https://openrouter.ai/keys')
      );

    } catch (error) {
      console.error(chalk.red('❌ Failed to load models'));
    }
  }
}
