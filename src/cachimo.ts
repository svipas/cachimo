type Key = string | number | boolean;
type Callback = (
	err: Error | null,
	key?: Key,
	value?: any,
	timeout?: number
) => void;

const cache: Map<Key, any> = new Map();
const timeouts: Map<number, () => void> = new Map();

/**
 * @returns value from cache.
 */
export function get(key: Key): any {
	return cache.get(key);
}

/**
 * @returns true if element was removed, false otherwise.
 */
export function remove(key: Key): boolean {
	return cache.delete(key);
}

/**
 * @returns true if element exists, false otherwise.
 */
export function has(key: Key): boolean {
	return cache.has(key);
}

/**
 * @returns number of elements stored in cache.
 */
export function size(): number {
	return cache.size;
}

/**
 * @returns all keys stored in cache.
 */
export function keys(): Key[] {
	return [...cache.keys()];
}

/**
 * @returns all values stored in cache.
 */
export function values(): any[] {
	return [...cache.values()];
}

/**
 * @returns all entries (keys and values) stored in cache.
 */
export function entries(): [Key, any][] {
	return [...cache.entries()];
}

/**
 * Removes all elements stored in cache and clears all timeouts.
 * @returns how much elements was removed from cache.
 */
export function clear(): number {
	timeouts.forEach((callback: () => void, timeout: number) => {
		clearTimeout(timeout);

		// Reject Promise or execute callback which returns error.
		callback();
	});

	const length = size();
	cache.clear();
	return length;
}

/**
 * Stores element in cache with specified key and value.
 *
 * @returns true if element was stored and key doesn't exist, false otherwise.
 */
export function put(key: Key, value: any): boolean;

/**
 * Stores element in cache with specified key and value.
 *
 * - Executes `callback` after `timeout`.
 *
 * @returns true if element was stored and key doesn't exist, false otherwise.
 */
export function put(
	key: Key,
	value: any,
	timeout: number,
	callback: Callback
): boolean;

/**
 * Stores element in cache with specified key and value.
 *
 * - Element will be deleted after given `timeout` and Promise will be resolved.
 * - Otherwise it will be rejected if element doesn't exist.
 *
 * @returns Promise.
 */
export function put(
	key: Key,
	value: any,
	timeout: number
): Promise<{ key: Key; value: any; timeout: number }>;

export function put(
	key: Key,
	value: any,
	timeout?: number,
	callback?: Callback
) {
	if (
		typeof key !== "string" &&
		typeof key !== "number" &&
		typeof key !== "boolean"
	) {
		throw new Error(
			`Key can only be string, number or boolean instead of ${typeof key}.`
		);
	}
	if (typeof key === "number" && Number.isNaN(key)) {
		throw new Error(
			"Key can only be string, number or boolean instead of NaN."
		);
	}
	if (
		timeout != null &&
		(typeof timeout !== "number" || Number.isNaN(timeout) || timeout <= 0)
	) {
		throw new Error("Timeout can only be a positive number.");
	}
	if (callback != null && typeof callback !== "function") {
		throw new Error(
			`Callback can only be function instead of ${typeof callback}.`
		);
	}

	if (has(key)) {
		return false;
	}

	cache.set(key, value);

	// Return Promise.
	if (timeout != null && callback == null) {
		return new Promise((resolve, reject) => {
			const timeoutId = setTimeout(() => {
				if (cache.delete(key)) {
					resolve({ key, value, timeout });
				} else {
					reject(new Error(`${key} doesn't exist.`));
				}
			}, timeout);
			timeouts.set(timeoutId as any, () =>
				reject(new Error(`${key} timeout was already cleared.`))
			);
		});
	}

	// Execute callback.
	if (timeout != null && callback != null) {
		const timeoutId = setTimeout(() => {
			if (cache.delete(key)) {
				callback(null, key, value, timeout);
			} else {
				callback(new Error(`${key} doesn't exist.`));
			}
		}, timeout);
		timeouts.set(timeoutId as any, () =>
			callback(new Error(`${key} timeout was already cleared.`))
		);
	}

	return true;
}
