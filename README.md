# cachimo &middot; [![npm](https://img.shields.io/npm/v/cachimo.svg)](https://www.npmjs.com/package/cachimo) [![Build Status](https://dev.azure.com/svipas/svipas/_apis/build/status/svipas.cachimo?branchName=master)](https://dev.azure.com/svipas/svipas/_build/latest?definitionId=6&branchName=master)

Stores key with value in-memory and can be deleted manually or after given timeout.

## Installation

### Yarn

```
yarn add cachimo
```

### npm

```
npm install cachimo
```

## Usage

### API

- **put**

```ts
import * as cachimo from "cachimo";

// Stores element in cache, you can remove it manually whenever you want.
// Returns true if element was successfully stored in cache, false if such key already exist.
cachimo.put("key", "value");
```

```ts
import * as cachimo from "cachimo";

// Stores element in cache and it will be deleted after given timeout which returns Promise.
cachimo
	.put("key", "value", 1000) // It will be deleted after 1 sec. and Promise will be resolved or rejected.
	.then(({ key, value, timeout }) => {
		// Returns key, value and timeout after delete.
		console.log(`Deleted ${key}:${value} after ${timeout}`);
	})
	.catch((err) => {
		// You will get error if key was deleted before timeout.
		throw err; // "Key doesn't exist."
	});
```

```ts
import * as cachimo from "cachimo";

// If you don't want to use Promise you can send callback which will be executed after given timeout.
cachimo.put("key", "value", 1000, (err, key, value, timeout) => {
	// You will get error if key was deleted before timeout.
	if (err) {
		throw err; // "Key doesn't exist."
	}

	// Returns key, value and timeout after delete.
	console.log(`Deleted ${key}:${value} after ${timeout}`);
});
```

- **clear**

```ts
import * as cachimo from "cachimo";

// Removes all elements stored in cache and clears all timeouts.
// Returns number of how much elements was removed from cache.
cachimo.clear();
```

- **get**

```ts
import * as cachimo from "cachimo";

// Returns value from cache by given key.
cachimo.get("key");
```

- **remove**

```ts
import * as cachimo from "cachimo";

// Returns true if element was removed, false otherwise.
cachimo.remove("key");
```

- **has**

```ts
import * as cachimo from "cachimo";

// Checks if whether an element with given key exists.
// Returns true if element exists, false otherwise.
cachimo.has("key");
```

- **size**

```ts
import * as cachimo from "cachimo";

// Returns the number of elements stored in cache.
cachimo.size();
```

- **keys**

```ts
import * as cachimo from "cachimo";

// Returns all keys stored in cache.
cachimo.keys();
```

- **values**

```ts
import * as cachimo from "cachimo";

// Returns all values stored in cache.
cachimo.values();
```

- **entries**

```ts
import * as cachimo from "cachimo";

// Returns all entries (keys and values) stored in cache.
cachimo.entries();
```

## Contributing

Feel free to open issues or PRs!
