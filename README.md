# cachimo

Stores key with value in-memory and can be deleted manually or after given timeout.

[![build status](https://circleci.com/gh/svipben/cachimo.svg?style=svg)](https://circleci.com/gh/svipben/cachimo)
[![npm version](https://img.shields.io/npm/v/cachimo.svg)](https://www.npmjs.com/package/cachimo)

## Installation

**NPM**

```
npm install cachimo
```

**Yarn**

```
yarn add cachimo
```

## How to use

### `put` function

```js
const cachimo = require('cachimo');

// stores element in-memory without `timeout`, you can remove it manually whenever you want
// returns true if element was successfully stored in-memory
cachimo.put('key', 'value');

// if you try to store same key twice it returns false because such key already exist
cachimo.put('key', 'value');
```

```js
const cachimo = require('cachimo');

// stores element in-memory and it will be deleted after given `timeout` which returns Promise
cachimo
	.put('key', 'value', 1000) // it will be deleted after 1 sec and Promise will be resolved or rejected
	.then(({ key, value, timeout }) => {
		// returns key, value and timeout after delete
		console.log(`Deleted ${key}:${value} after ${timeout}`);
	})
	.catch((err) => {
		// you will get error if key was deleted before `timeout`
		throw err; // "key does not exist"
	});

// if you don't want to use Promise you can send callback which will be executed after given `timeout`
cachimo.put('key', 'value', 1000, (err, key, value, timeout) => {
	if (err) {
		// you will get error if key was deleted before `timeout`
		throw err; // "key does not exist"
	}

	// returns key, value and timeout after delete
	console.log(`Deleted ${key}:${value} after ${timeout}`);
});
```

### `clear` function

```js
const cachimo = require('cachimo');

// Promise
cachimo.put('key', 'value', 1000).catch((err) => {
	// you will get error because at the end of the code there's `clear()` function which clears all timeouts as well as keys and values
	throw err; // "key timeout was cleared"
});

// callback
cachimo.put('key', 'value', 1000, (err) => {
	if (err) {
		// you will get error because at the end of the code there's `clear()` function which clears all timeouts as well as keys and values
		throw err; // "key timeout was cleared"
	}
});

// removes all elements stored in cache and clears all timeouts
cachimo.clear(); // returns number of how much elements was removed from cache
```

### Other functions

```js
const cachimo = require('cachimo');

// returns value from cache by given `key`
cachimo.get('key'); // 'value'

// you can remove it whenever you want
cachimo.remove('key'); // returns true if element was removed, false otherwise

// checks if whether an element with given `key` exist
cachimo.has('key'); // returns true if element exist, false otherwise

// returns the number of elements in cache
cachimo.size();

// returns all keys stored in cache
cachimo.keys(); // ['key']

// returns all values stored in cache
cachimo.values(); // ['value']

// returns all entries (keys and values) stored in cache
cachimo.entries(); // [['key', 'value']]
```
