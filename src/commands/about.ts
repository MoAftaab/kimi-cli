import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';
import figlet from 'figlet';

export class AboutCommand {
  register(program: Command): void {
    program
      .command('about')
      .alias('info')
      .description('ℹ️ Show information about the developer and project')
      .action(() => {
        this.run();
      });
  }

  run(): void {
    // ASCII Art for "ABOUT"
    const title = figlet.textSync('ABOUT', {
      font: 'Small',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    });

    console.log(gradient.rainbow.multiline(title));
    
    console.log(
      boxen(
        chalk.cyan('👨‍💻 Developer Information') + '\n\n' +
        chalk.yellow('🔸 Name: ') + chalk.magenta.bold('MOHD AFTAAB') + '\n' +
        chalk.yellow('🔸 GitHub: ') + chalk.blue('https://github.com/MoAftaab') + '\n' +
        chalk.yellow('🔸 Email: ') + chalk.blue('moaftaab786@gmail.com') + '\n\n' +
        
        chalk.cyan('🚀 Project Information') + '\n\n' +
        chalk.yellow('🔸 Project: ') + chalk.green('Kimi CLI') + '\n' +
        chalk.yellow('🔸 Description: ') + chalk.white('A beautiful command-line interface for Kimi AI') + '\n' +
        chalk.yellow('🔸 Repository: ') + chalk.blue('https://github.com/MoAftaab/kimi-cli') + '\n' +
        chalk.yellow('🔸 License: ') + chalk.green('MIT') + '\n\n' +
        
        chalk.cyan('🛠️ Technologies Used') + '\n\n' +
        chalk.gray('• ') + chalk.white('TypeScript') + chalk.gray(' - Type-safe JavaScript') + '\n' +
        chalk.gray('• ') + chalk.white('Node.js') + chalk.gray(' - Runtime environment') + '\n' +
        chalk.gray('• ') + chalk.white('Commander.js') + chalk.gray(' - CLI framework') + '\n' +
        chalk.gray('• ') + chalk.white('Chalk') + chalk.gray(' - Terminal colors') + '\n' +
        chalk.gray('• ') + chalk.white('Inquirer.js') + chalk.gray(' - Interactive prompts') + '\n' +
        chalk.gray('• ') + chalk.white('OpenRouter API') + chalk.gray(' - AI integration') + '\n\n' +
        
        chalk.cyan('💝 Support & Contributions') + '\n\n' +
        chalk.gray('• ') + chalk.yellow('Star the repo: ') + chalk.blue('https://github.com/MoAftaab/kimi-cli') + '\n' +
        chalk.gray('• ') + chalk.yellow('Report issues: ') + chalk.blue('https://github.com/MoAftaab/kimi-cli/issues') + '\n' +
        chalk.gray('• ') + chalk.yellow('Contribute: ') + chalk.blue('Fork and submit PR') + '\n' +
        chalk.gray('• ') + chalk.yellow('Contact: ') + chalk.blue('moaftaab786@gmail.com'),
        {
          padding: 2,
          margin: 1,
          borderStyle: 'double',
          borderColor: 'magenta',
          title: '💻 About Kimi CLI',
          titleAlignment: 'center'
        }
      )
    );

    console.log(
      chalk.dim('\n💡 ') +
      chalk.cyan('Thank you for using Kimi CLI! ') +
      chalk.yellow('⭐')
    );

    console.log(
      chalk.dim('🌟 If you like this project, please consider giving it a star on GitHub!')
    );
  }
}
