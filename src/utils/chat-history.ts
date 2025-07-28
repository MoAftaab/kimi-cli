import { KimiMessage } from '../lib/kimi-client.js';
import { promises as fs } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import chalk from 'chalk';

export interface ChatSession {
  id: string;
  messages: KimiMessage[];
  createdAt: Date;
  updatedAt: Date;
  title?: string;
}

export class ChatHistory {
  private historyDir: string;

  constructor() {
    this.historyDir = join(homedir(), '.kimi-cli', 'history');
    this.ensureHistoryDir();
  }

  private async ensureHistoryDir(): Promise<void> {
    try {
      await fs.mkdir(this.historyDir, { recursive: true });
    } catch (error) {
      // Directory already exists or permission error
    }
  }

  async saveSession(messages: KimiMessage[], title?: string): Promise<string> {
    await this.ensureHistoryDir();
    
    const sessionId = this.generateSessionId();
    const session: ChatSession = {
      id: sessionId,
      messages,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: title || this.generateTitle(messages)
    };

    const filePath = join(this.historyDir, `${sessionId}.json`);
    await fs.writeFile(filePath, JSON.stringify(session, null, 2));

    return sessionId;
  }

  async loadSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const filePath = join(this.historyDir, `${sessionId}.json`);
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  }

  async listSessions(): Promise<ChatSession[]> {
    try {
      await this.ensureHistoryDir();
      const files = await fs.readdir(this.historyDir);
      const sessions: ChatSession[] = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const sessionId = file.replace('.json', '');
          const session = await this.loadSession(sessionId);
          if (session) {
            sessions.push(session);
          }
        }
      }

      return sessions.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } catch (error) {
      return [];
    }
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const filePath = join(this.historyDir, `${sessionId}.json`);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async clearAllSessions(): Promise<void> {
    try {
      const files = await fs.readdir(this.historyDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          await fs.unlink(join(this.historyDir, file));
        }
      }
    } catch (error) {
      // Ignore errors
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTitle(messages: KimiMessage[]): string {
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length > 0) {
      const firstMessage = userMessages[0].content;
      return firstMessage.length > 50 
        ? firstMessage.substring(0, 47) + '...'
        : firstMessage;
    }
    return 'Untitled Chat';
  }

  printSessions(sessions: ChatSession[]): void {
    if (sessions.length === 0) {
      console.log(chalk.yellow('📝 No chat sessions found.'));
      return;
    }

    console.log(chalk.cyan('📚 Chat History:'));
    console.log(chalk.gray('─'.repeat(80)));

    sessions.forEach((session, index) => {
      const date = new Date(session.updatedAt).toLocaleDateString();
      const time = new Date(session.updatedAt).toLocaleTimeString();
      const messageCount = session.messages.length;

      console.log(
        chalk.yellow(`${index + 1}. `) +
        chalk.white(session.title) +
        chalk.gray(` (${session.id})`)
      );
      console.log(
        chalk.gray(`   📅 ${date} ${time} | 💬 ${messageCount} messages`)
      );
      console.log();
    });
  }
}
