# electron-data-storage

> Simple data persistence for Electron app, It's **Thread safety**, Can be called directly from the main process and the renderer process.

[![npm version](https://badge.fury.io/js/electron-data-storage.svg)](http://badge.fury.io/js/electron-data-storage)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/lzdyes/electron-data-storage)

## Installation

```sh
$ npm install electron-data-storage

or

$ yarn add electron-data-storage
```

## Usage

```ts
import storage from 'electron-data-storage'

storage.set('hi', 'Hello World!')
storage.get('hi')
storage.remove('hi')
storage.clear()
```

You can require this module in Electron **main** or **renderer** process.

## API

### set

#### storage.set(key: string, value: string | number | boolean)

```ts
storage.set(key, value)
```

### get

#### storage.get(key: string): string | number | boolean | undefined

```ts
const value = storage.get(key)
console.log(value)
```

### remove

#### storage.remove(key: string)

```ts
storage.remove(key)
```

### clear

#### storage.clear()

```ts
storage.clear()
```

## Tests

Use Jest, edit in **test/index.tset.ts**

```sh
$ yarn test
```

## Contribute

Contributions are welcome! please open issues and pull request :)

## License

The project is licensed under the MIT license.
