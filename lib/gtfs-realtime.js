import { writeFile } from 'node:fs/promises'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'

import { formatFilename, formatHeaders } from './utils.js'
import { log, logError } from './log-utils.js'

const gtfsRealtime = async (args) => {
  const logFunction = log(args)
  const logErrorFunction = logError(args)

  logFunction(`Downloading GTFS-Realtime from ${args.url}`)

  const response = await fetch(args.url, {
    headers: formatHeaders(args.header),
  })

  if (!response.ok) {
    const error = new Error(
      `${response.url}: ${response.status} ${response.statusText}`,
    )
    logErrorFunction(error || `${response.statusCode} Error`)
    error.response = response
    throw error
  }

  const buffer = await response.arrayBuffer()
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
    new Uint8Array(buffer),
  )

  const filepath = formatFilename(args)
  await writeFile(filepath, JSON.stringify(feed, null, 2))
  logFunction(`GTFS-Realtime saved as JSON to ${filepath}`)
}

export default gtfsRealtime
