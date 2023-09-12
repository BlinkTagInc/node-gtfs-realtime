#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { formatError } from '../lib/log-utils.js'
import gtfsRealtime from '../lib/gtfs-realtime.js'

const { argv } = yargs(hideBin(process.argv))
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

const handleError = (error) => {
  const text = error || 'Unknown Error'
  process.stdout.write(`\n${formatError(text)}\n`)
  console.error(error)
  process.exit(1)
}

const setupImport = async () => {
  await gtfsRealtime(argv)
  process.exit()
}

setupImport().catch(handleError)
