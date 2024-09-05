#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import PrettyError from 'pretty-error'

import { formatError } from '../lib/log-utils.ts'
import gtfsRealtime from '../lib/gtfs-realtime.ts'

import type { IArgs } from '../types/global_interfaces.ts'

const pe = new PrettyError()

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <url>')
  .help()
  .version()
  .command(
    '$0 <url>',
    'Fetch GTFS-Realtime data and convert to JSON',
    (yargs) => {
      yargs
        .positional('url', {
          describe: 'GTFS-Realtime URL',
          type: 'string',
        })
        .option('H', {
          alias: 'header',
          array: true,
          describe:
            'HTTP headers to be included in the request for GTFS-Realtime data (optional)',
          type: 'string',
        })
        .option('o', {
          alias: 'output',
          describe: 'Path to output file (optional)',
          type: 'string',
        })
        .option('s', {
          alias: 'silent',
          describe: 'Hide all output',
          type: 'boolean',
        })
    },
  )
  .parseSync()

const handleError = (error = new Error('Unknown Error')) => {
  process.stdout.write(`\n${formatError(error)}\n`)
  console.error(pe.render(error))
  process.exit(1)
}
const setupImport = async () => {
  if (argv.url === undefined || argv.url === null) {
    return handleError(new Error('URL is required'))
  }

  const config: IArgs = {
    url: argv.url.toString(),
    ...argv,
  }

  await gtfsRealtime(config)
  process.exit()
}

setupImport().catch(handleError)
