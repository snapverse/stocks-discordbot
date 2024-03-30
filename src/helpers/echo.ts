import chalk from 'chalk';

const log = console.log;

const now = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default {
  log(...messages: string[]) {
    log(chalk.bold.gray(`[${now()}] Log: `, messages.join(' ')));
  },
  warn(...messages: string[]) {
    log(chalk.bold.yellow(`[${now()}] Warning: `, messages.join(' ')));
  },
  error(...messages: string[]) {
    log(chalk.bold.red(`[${now()}] Error: `, messages.join(' ')));
  }
};
