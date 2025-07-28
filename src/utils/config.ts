import { promises as fs } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import chalk from 'chalk';

interface ConfigData {
  apiKey?: string;
  defaultModel?: string;
  maxTokens?: number;
  temperature?: number;
  theme?: string;
}

export class Config {
  private configPath: string;
  private configDir: string;

  constructor() {
    this.configDir = join(homedir(), '.kimi-cli');
    this.configPath = join(this.configDir, 'config.json');
    this.ensureConfigDir();
  }

  private async ensureConfigDir(): Promise<void> {
    try {
      await fs.mkdir(this.configDir, { recursive: true });
    } catch (error) {
      // Directory already exists or permission error
    }
  }

  get<T = any>(key: string): T | undefined {
    try {
      const fs = require('fs');
      const content = fs.readFileSync(this.configPath, 'utf8');
      const data = JSON.parse(content);
      return data[key] as T;
    } catch (error) {
      return undefined;
    }
  }

  set(key: string, value: any): void {
    try {
      const fs = require('fs');
      const path = require('path');
      
      let data: ConfigData = {};
      try {
        const content = fs.readFileSync(this.configPath, 'utf8');
        data = JSON.parse(content);
      } catch (error) {
        // File doesn't exist, start with empty config
      }
      
      data[key] = value;
      
      fs.mkdirSync(path.dirname(this.configPath), { recursive: true });
      fs.writeFileSync(this.configPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }

  delete(key: string): void {
    try {
      const fs = require('fs');
      const content = fs.readFileSync(this.configPath, 'utf8');
      const data = JSON.parse(content);
      delete data[key];
      fs.writeFileSync(this.configPath, JSON.stringify(data, null, 2));
    } catch (error) {
      // Config doesn't exist, nothing to delete
    }
  }

  clear(): void {
    try {
      const fs = require('fs');
      fs.writeFileSync(this.configPath, JSON.stringify({}, null, 2));
    } catch (error) {
      // Ignore errors
    }
  }

  getAll(): ConfigData {
    try {
      const fs = require('fs');
      const content = fs.readFileSync(this.configPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      return {};
    }
  }

  getPath(): string {
    return this.configPath;
  }

  printConfig(): void {
    const config = this.getAll();
    console.log(chalk.cyan('📋 Current Configuration:'));
    console.log(chalk.gray('─'.repeat(50)));
    
    Object.entries(config).forEach(([key, value]) => {
      if (key === 'apiKey') {
        console.log(`${chalk.yellow(key)}: ${chalk.green('***hidden***')}`);
      } else {
        console.log(`${chalk.yellow(key)}: ${chalk.green(String(value))}`);
      }
    });
    
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.dim(`Config file: ${this.getPath()}`));
  }
}
