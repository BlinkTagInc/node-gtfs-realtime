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

`node-GTFS-Realtime` fetches transit data in [GTFS-realtime format](https://developers.google.com/transit/) saves it as a JSON file. 
You can use it as a [command-line tool](#command-line-examples) or as a [node.js module](#code-example).

Run it right now from your command line:

```
npx gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx
```

This will save a file to the current directory, named like `gtfs-realtime-2022-05-28T002330.164Z.json` using the current time.


## Installation

If you would like to use this library as a command-line utility, you can install it globally directly from [npm](https://npmjs.org):

    npm install gtfs-realtime -g

If you are using this as a node module as part of an application, you can include it in your project's `package.json` file.

## Quick Start

### Command-Line Examples

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx

With custom HTTP headers

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx --header "Authorization: bearer 1234567"

### Code example

```js
import gtfsRealtime from 'gtfs';

const config = {
  url: 'http://api.bart.gov/gtfsrt/tripupdate.aspx',
  output: '/path/to/save/file.json',
  header: ['Authorization: bearer 12345']
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

The `gtfs-realtime` command-line utility will download GTFS-Realtime data and save it as a JSON file.

### gtfs-realtime Command-line options

`silent`

Hides all console output

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx --silent

`header`

Specify one or more HTTP headers to be included in the request.

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx --header "Authorization: bearer 1234567" --header "test:true"

`output`

Specify a path to save the JSON file. Optional, defaults to the current directory using a filename with the current time.

    gtfs-realtime http://api.bart.gov/gtfsrt/tripupdate.aspx --output /path/to/save/file.json

`help`

Show help.

    gtfs-realtime --help

`version`

Show version

    gtfs-realtime --version

## Contributing

Pull requests are welcome, as is feedback and [reporting issues](https://github.com/blinktaginc/node-gtfs-realtime/issues).

### Linting

    npm run lint
