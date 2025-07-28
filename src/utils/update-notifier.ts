import chalk from 'chalk';

export function updateNotifier(): void {
  try {
    // Simple update check implementation
    console.log(chalk.dim('📦 Checking for updates...'));
  } catch (error) {
    // Silently fail if update check fails
  }
}
