import sanitize from 'sanitize-filename'
import { fromPairs } from 'lodash-es'

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

export const formatFilename = (gtfsRealtimeType: string, output?: string) => {
  const isoDate = new Date().toISOString()
  const filepath = output ?? `gtfs-realtime-${gtfsRealtimeType}-${isoDate}.json`
  return sanitize(filepath)
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
