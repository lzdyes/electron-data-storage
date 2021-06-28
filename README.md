# electron-data-storage

> Simple data persistence for Electron app

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
```

You can require this module in Electron **main** or **renderer** process.

## API

### set

#### storage.set(key: string, value: string | number | boolean): Promise\<void>

```ts
storage
  .set(key, value)
  .then(() => {
    console.log('set value success')
  })
  .catch((error) => console.error(error))

// or use async/await

await storage.set(key, value)
```

### get

#### storage.get(key: string): Promise<string | number | boolean | undefined>

```ts
storage
  .get(key)
  .then((value) => {
    console.log(value)
  })
  .catch((error) => console.error(error))

// or use async/await

const value = await storage.get(key)
console.log(value)
```

### getSync

#### storage.getSync(key: string): string | number | boolean | undefined

```ts
const value = storage.getSync(key)
console.log(value)
```

### remove

#### storage.remove(key: string): Promise\<void>

```ts
storage
  .remove(key)
  .then(() => {
    console.log('remove value success')
  })
  .catch((error) => console.error(error))

// or use async/await

await storage.remove(key)
```

### clear

#### storage.clear(): Promise\<void>

```ts
storage
  .clear()
  .then(() => {
    console.log('clear storage success')
  })
  .catch((error) => console.error(error))

// or use async/await

await storage.clear()
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
