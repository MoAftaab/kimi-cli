import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';
import figlet from 'figlet';

export class WelcomeCommand {
  register(program: Command): void {
    program
      .command('welcome')
      .alias('w')
      .description('👋 Show welcome message and help')
      .action(() => {
        this.run();
      });
  }

  run(): void {
    // ASCII Art
    const title = figlet.textSync('KIMI CLI', {
      font: 'Small',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    });

    console.log(gradient.pastel.multiline(title));
    
    console.log(
      boxen(
        chalk.cyan('🤖 Welcome to Kimi CLI!') + '\n\n' +
        chalk.white('A beautiful command-line interface for Kimi AI with rich visuals and interactive features.') + '\n\n' +
        chalk.yellow('🚀 Quick Start:') + '\n' +
        chalk.gray('1. Set your API key: ') + chalk.cyan('kimi config set-key') + '\n' +
        chalk.gray('2. Start chatting: ') + chalk.cyan('kimi chat') + '\n' +
        chalk.gray('3. Ask a question: ') + chalk.cyan('kimi ask "What is AI?"') + '\n\n' +
        chalk.yellow('📋 Available Commands:') + '\n' +
        chalk.gray('• ') + chalk.green('kimi chat') + chalk.gray(' - Interactive chat session') + '\n' +
        chalk.gray('• ') + chalk.green('kimi ask') + chalk.gray(' - Ask a single question') + '\n' +
        chalk.gray('• ') + chalk.green('kimi config') + chalk.gray(' - Manage configuration') + '\n' +
        chalk.gray('• ') + chalk.green('kimi history') + chalk.gray(' - View chat history') + '\n' +
        chalk.gray('• ') + chalk.green('kimi models') + chalk.gray(' - List available models') + '\n\n' +
        chalk.yellow('🔗 Useful Links:') + '\n' +
        chalk.gray('• Get API Key: ') + chalk.blue('https://openrouter.ai/keys') + '\n' +
        chalk.gray('• Documentation: ') + chalk.blue('https://github.com/MoAftaab/kimi-cli') + '\n' +
        chalk.gray('• Report Issues: ') + chalk.blue('https://github.com/MoAftaab/kimi-cli/issues') + '\n\n' +
        chalk.yellow('👨‍💻 Developed by:') + '\n' +
        chalk.gray('• Developer: ') + chalk.magenta('MOHD AFTAAB') + '\n' +
        chalk.gray('• GitHub: ') + chalk.blue('https://github.com/MoAftaab') + '\n' +
        chalk.gray('• Email: ') + chalk.blue('moaftaab786@gmail.com'),
        {
          padding: 2,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'cyan',
          title: '🎉 Kimi CLI v1.0.0',
          titleAlignment: 'center'
        }
      )
    );

    console.log(
      chalk.dim('\n💡 Tip: Use ') +
      chalk.cyan('kimi --help') +
      chalk.dim(' to see all available commands and options.')
    );

    console.log(
      chalk.dim('\n✨ Enjoy using Kimi CLI! Happy chatting! ') +
      chalk.yellow('🚀')
    );
  }
}
