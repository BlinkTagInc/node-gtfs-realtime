import { writeFile } from 'node:fs/promises'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'

import {
  determineGtfsRealtimeType,
  formatFilename,
  formatHeaders,
} from './utils.ts'
import { log as _log, logError as _logError } from './log-utils.ts'

import type { IArgs } from '../types/global_interfaces.ts'

const gtfsRealtime = async (config: IArgs) => {
  const log = _log(config)
  const logError = _logError(config)

  log(`Downloading GTFS-Realtime from ${config.url}`)

  const response = await fetch(config.url, {
    headers: formatHeaders(config.header),
  })

  if (!response.ok) {
    const error = new Error(
      `${response.url}: ${response.status} ${response.statusText}`,
    )
    logError(error.message)
    throw error
  }

  const buffer = await response.arrayBuffer()
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
    new Uint8Array(buffer),
  )

  const gtfsRealtimeType = determineGtfsRealtimeType(feed)

  const filepath = formatFilename(gtfsRealtimeType, config.output)
  await writeFile(filepath, JSON.stringify(feed, null, 2))
  log(`GTFS-Realtime saved as JSON to ${filepath}`)
}

export default gtfsRealtime
