export interface Config {
  url: string;
}

/**
 * Queries `stop_times` and returns a promise for an array of stop_times.
 */
 export function gtfsRealtime(config: Config): Promise<undefined>;
