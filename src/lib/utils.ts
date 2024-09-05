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

export const formatFilename = (output?: string) => {
  const isoDate = new Date().toISOString()
  const filepath = output ?? `gtfs-realtime-${isoDate}.json`
  return sanitize(filepath)
}
