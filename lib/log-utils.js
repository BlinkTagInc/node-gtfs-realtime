import { clearLine, cursorTo } from 'node:readline';
import PrettyError from 'pretty-error';
import { noop } from 'lodash-es';
import chalk from 'chalk';

const pe = new PrettyError();
pe.start();

/*
 * Returns a log function based on config settings
 */
export function log(args) {
  if (args.silent === true) {
    return noop;
  }

  return (text, overwrite) => {
    if (overwrite === true && process.stdout.isTTY) {
      clearLine(process.stdout, 0);
      cursorTo(process.stdout, 0);
    } else {
      process.stdout.write('\n');
    }

    process.stdout.write(text);
  };
}

/*
 * Returns an warning log function based on config settings
 */
export function logWarning(args) {
  if (args.silent === true) {
    return noop;
  }

  return (text) => {
    process.stdout.write(`\n${formatWarning(text)}\n`);
  };
}

/*
 * Returns an error log function based on config settings
 */
export function logError(args) {
  if (args.silent === true) {
    return noop;
  }

  return (text) => {
    process.stdout.write(`\n${formatError(text)}\n`);
  };
}

/*
 * Format console warning text
 */
export function formatWarning(text) {
  return `${chalk.yellow.underline('Warning')}${chalk.yellow(
    ':'
  )} ${chalk.yellow(text)}`;
}

/*
 * Format console error text
 */
export function formatError(error) {
  const message = error instanceof Error ? error.message : error;
  return `${chalk.red.underline('Error')}${chalk.red(':')} ${chalk.red(
    message.replace('Error: ', '')
  )}`;
}
