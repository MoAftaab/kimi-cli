import chalk from 'chalk';

export class Logger {
  private debugMode: boolean;

  constructor() {
    this.debugMode = process.env.DEBUG === 'true';
  }

  info(message: string, data?: any): void {
    console.log(chalk.blue('ℹ'), message);
    if (data && this.debugMode) {
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
    }
  }

  success(message: string, data?: any): void {
    console.log(chalk.green('✅'), message);
    if (data && this.debugMode) {
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
    }
  }

  warning(message: string, data?: any): void {
    console.log(chalk.yellow('⚠️'), message);
    if (data && this.debugMode) {
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
    }
  }

  error(message: string, error?: any): void {
    console.error(chalk.red('❌'), message);
    if (error) {
      if (this.debugMode) {
        console.error(chalk.red(error.stack || error.message || error));
      } else {
        console.error(chalk.red(error.message || error));
      }
    }
  }

  debug(message: string, data?: any): void {
    if (!this.debugMode) return;
    
    console.log(chalk.gray('🐛'), chalk.dim(message));
    if (data) {
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
    }
  }

  spinner(message: string): void {
    console.log(chalk.cyan('⏳'), message);
  }
}
