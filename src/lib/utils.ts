import { dirname } from 'node:path'
import { access, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

import untildify from 'untildify'
import { fromPairs } from 'lodash-es'

/*
 * Prepare the output directory.
 */
export async function prepDirectory(outputPath: string | undefined) {
  if (!outputPath) {
    return
  }

  const folderPath = dirname(outputPath)
  // Check if folderPath exists
  try {
    await access(folderPath)
  } catch (error: any) {
    try {
      await mkdir(folderPath, { recursive: true })
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        throw new Error(
          `Unable to write to ${folderPath}. Try running this command from a writable directory.`,
        )
      }

      throw error
    }
  }

  // Check if the file exists, if so, throw an error
  if (existsSync(outputPath)) {
    throw new Error(`File already exists: ${outputPath}`)
  }
}

export const formatHeaders = (
  headers: string[] | undefined,
): Record<string, string> => {
  if (!headers) {
    return {}
  }

  return fromPairs(
    headers.map((header: string) => {
      const parts = header.split(':')

      if (parts.length === 1) {
        return [parts[0].trim(), '']
      }

      return [parts[0].trim(), parts.slice(1).join(':').trim()]
    }),
  )
}

export const formatFilename = (
  gtfsRealtimeType: string,
  outputPath?: string,
) => {
  const isoDate = new Date().toISOString()
  const filepath = outputPath
    ? untildify(outputPath)
    : `gtfs-realtime-${gtfsRealtimeType}-${isoDate}.json`
  return filepath
}

export const determineGtfsRealtimeType = (feed: any) => {
  const hasTripUpdate = feed.entity.some((entity: any) => entity.tripUpdate)

  if (hasTripUpdate) {
    return 'tripupdate'
  }

  const hasVehiclePosition = feed.entity.some(
    (entity: any) => entity.vehicle && entity.vehicle.position,
  )

  if (hasVehiclePosition) {
    return 'vehicleposition'
  }

  const hasAlert = feed.entity.some((entity: any) => entity.alert)

  if (hasAlert) {
    return 'alert'
  }

  return 'unknown'
}
