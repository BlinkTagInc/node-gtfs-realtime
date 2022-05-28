import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';
import request from 'request';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

import { formatFilename, formatHeaders } from './utils.js';
import { log, logError } from './log-utils.js';

const requestPromise = promisify(request);

const gtfsRealtime = async (args) => {
  const logFunction = log(args);
  const logErrorFunction = logError(args);

  logFunction(`Downloading GTFS-Realtime from ${args.url}`);

  const requestSettings = {
    method: 'GET',
    url: args.url,
    encoding: null,
    headers: formatHeaders(args.header),
  };

  await requestPromise(requestSettings, async (error, response, body) => {
    if (error || response.statusCode !== 200) {
      logErrorFunction(error || `${response.statusCode} Error`);
      throw new Error("Couldn't download GTFS-Realtime");
    }

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    const filepath = formatFilename(args);
    await writeFile(filepath, JSON.stringify(feed, null, 2));
    logFunction(`GTFS-Realtime saved as JSON to ${filepath}`);
  });
};

export default gtfsRealtime;
