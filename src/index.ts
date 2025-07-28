#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { KimiClient } from './lib/kimi-client.js';
import { ChatCommand } from './commands/chat.js';
import { ConfigCommand } from './commands/config.js';
import { HistoryCommand } from './commands/history.js';
import { ModelsCommand } from './commands/models.js';
import { WelcomeCommand } from './commands/welcome.js';
import { AboutCommand } from './commands/about.js';
import { updateNotifier } from './utils/update-notifier.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const program = new Command();

// ASCII Art Banner
const banner = figlet.textSync('KIMI CLI', {
  font: 'ANSI Shadow',
  horizontalLayout: 'default',
  verticalLayout: 'default'
});

console.log(gradient.pastel.multiline(banner));
console.log(chalk.cyan('🤖 The Beautiful CLI for Kimi AI'));
console.log(chalk.gray('   Developed by ') + chalk.magenta('MOHD AFTAAB') + chalk.gray(' | ') + chalk.blue('https://github.com/MoAftaab'));
console.log('');

// Check for updates
updateNotifier();

// Initialize CLI
program
  .name('kimi')
  .description('🤖 A beautiful CLI for Kimi AI with rich terminal interface\n   Developed by MOHD AFTAAB | https://github.com/MoAftaab')
  .version(version, '-v, --version', 'Display version information')
  .option('-d, --debug', 'Enable debug mode')
  .hook('preAction', (thisCommand) => {
    if (thisCommand.opts().debug) {
      process.env.DEBUG = 'true';
    }
  });

// Initialize Kimi client
const kimiClient = new KimiClient();

// Register commands
const chatCommand = new ChatCommand(kimiClient);
const configCommand = new ConfigCommand();
const historyCommand = new HistoryCommand();
const modelsCommand = new ModelsCommand(kimiClient);
const welcomeCommand = new WelcomeCommand();
const aboutCommand = new AboutCommand();

chatCommand.register(program);
configCommand.register(program);
historyCommand.register(program);
modelsCommand.register(program);
welcomeCommand.register(program);
aboutCommand.register(program);

// Default action - show welcome
program.action(() => {
  welcomeCommand.run();
});

// Parse CLI arguments
program.parse();
