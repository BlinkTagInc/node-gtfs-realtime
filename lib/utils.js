import sanitize from 'sanitize-filename';
import { fromPairs } from 'lodash-es';

export const formatHeaders = (headers) => {
  if (!headers) {
    return undefined;
  }

  return fromPairs(
    headers.map((header) => {
      const parts = header.split(':');

      if (parts.length === 1) {
        return parts[0].trim();
      }

      return [parts[0].trim(), parts.slice(1).join(':').trim()];
    })
  );
};

export const formatFilename = (args) => {
  const isoDate = new Date().toISOString();
  const filepath = args.output ?? `gtfs-realtime-${isoDate}.json`;
  return sanitize(filepath);
};
