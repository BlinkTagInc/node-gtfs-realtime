<p align="center">
  ➡️
  <a href="#installation">Installation</a> |
  <a href="#quick-start">Quick Start</a>
  ⬅️
  <br /><br />
  <img src="docs/images/node-gtfs-realtime-logo.svg" alt="node-GTFS-Realtime" />
  <br /><br />
  <a href="https://www.npmjs.com/package/gtfs-realtime" rel="nofollow"><img src="https://img.shields.io/npm/v/gtfs-realtime.svg?style=flat" style="max-width: 100%;"></a>
  <a href="https://www.npmjs.com/package/gtfs-realtime" rel="nofollow"><img src="https://img.shields.io/npm/dm/gtfs-realtime.svg?style=flat" style="max-width: 100%;"></a>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  <br /><br />
  Download GTFS-Realtime data as JSON
  <br /><br />
  <a href="https://nodei.co/npm/gtfs-realtime/" rel="nofollow"><img src="https://nodei.co/npm/gtfs-realtime.png?downloads=true" alt="NPM" style="max-width: 100%;"></a>
</p>

<hr>

[GTFS-realtime](https://developers.google.com/transit/gtfs-realtime) transit data is in [protobuf format](https://developers.google.com/protocol-buffers) which means its not human-readable by default. `node-GTFS-Realtime` aims to make it fast and easy to inspect GTFS-realtime data by providing a one-line command for downloading [GTFS-realtime format](https://developers.google.com/transit/gtfs-realtime) data and converting to JSON.

Run it right now from your command line:

```
npx gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx
```

The command above will fetch BART's GTFS-Realtime trip updates and save them to a file to the current directory in JSON format, named like `gtfs-realtime-2022-05-28T002330.164Z.json` (using the current time). You can open the resulting file in a text editor to review.

`node-GTFS-Realtime` can be used as a [command-line tool](#command-line-examples) or as a [node.js module](#code-example).

## Example JSON

Below is an example of the JSON result for a GTFS-Realtime Trip Updates request:

```json
{
  "header": {
    "gtfsRealtimeVersion": "1.0",
    "incrementality": "FULL_DATASET",
    "timestamp": "1653701655"
  },
  "entity": [
    {
      "id": "1001663",
      "tripUpdate": {
        "trip": {
          "tripId": "1001663",
          "scheduleRelationship": "SCHEDULED"
        },
        "stopTimeUpdate": [
          {
            "stopSequence": 13,
            "arrival": {
              "delay": 25,
              "time": "1653701754",
              "uncertainty": 30
            },
            "departure": {
              "delay": 25,
              "time": "1653701775",
              "uncertainty": 30
            },
            "stopId": "SANL"
          }
        ]
      }
    }
  ]
}
```

## Installation

If you would like to use this library as a command-line utility, you can install it globally directly from [npm](https://npmjs.org):

    npm install gtfs-realtime -g

Or you can use it directly via npx:

    npx gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx

If you are using this as a node module as part of an application, you can include it in your project's `package.json` file.

## Quick Start

### Command-Line Examples

Run via npx:

    npx gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx

If installed globally:

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx

With custom HTTP headers

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx --header "Authorization: bearer 1234567"

### Code example

```js
import gtfsRealtime from 'gtfs';

const config = {
  url: 'http://api.bart.gov/gtfsrt/tripupdate.aspx',
  output: '/path/to/save/file.json',
  header: ['Authorization: bearer 12345'],
};

gtfsRealtime(config)
  .then(() => {
    console.log('Import Successful');
  })
  .catch((err) => {
    console.error(err);
  });
```

## Command-Line Usage

```
gtfs-realtime [options...] <url>

The `gtfs-realtime` command-line utility will download GTFS-Realtime data from the specified URL and save it as a JSON file.

### Options

`-s, --silent`

Hides all console output

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx --silent

`-H, --header`

Specify one or more HTTP headers to be included in the request.

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx --header "Authorization: bearer 1234567" --header "test:true"

`-o, --output`

Specify a path to save the JSON file. Optional, defaults to the current directory using a filename with the current time.

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx --output /path/to/save/file.json

`--help`

Show help.

    gtfs-realtime --help

`--version`

Show version

    gtfs-realtime --version

## Contributing

Pull requests are welcome, as is feedback and [reporting issues](https://github.com/blinktaginc/node-gtfs-realtime/issues).
```
