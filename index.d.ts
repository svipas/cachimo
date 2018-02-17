/**
 * Returns value from cache by given `key`.
 */
export function get(key: string | number | boolean): any;

/**
 * Removes element from cache by given `key`.
 *
 * @returns true if element has been removed, false otherwise
 */
export function remove(key: string | number | boolean): boolean;

/**
 * Checks if whether an element with given `key` exist.
 *
 * @returns true if element exist, false otherwise
 */
export function has(key: string | number | boolean): boolean;

/**
 * Returns the number of elements in cache.
 *
 * @returns number of elements in cache
 */
export function size(): number;

/**
 * Returns all keys stored in cache.
 *
 * @returns all keys
 */
export function keys(): Array<string | number | boolean>;

/**
 * Returns all values stored in cache.
 *
 * @returns all values
 */
export function values(): Array<any>;

/**
 * Returns all entries (keys and values) stored in cache.
 *
 * @returns all entries (keys and values)
 */
export function entries(): Array<[string | number | boolean, any]>;

/**
 * Removes all elements stored in cache and clears all timeouts.
 *
 * @returns how much elements was removed from cache
 */
export function clear(): number;

/**
 * Stores an element in-memory with specified key and value.
 *
 * If only `key` and `value` is provided it returns boolean.
 * true: if element was stored and key doesn't exist.
 * false: if key does exist.
 *
 * If additionally only `timeout` is provided it returns Promise.
 * Element will be deleted after given `timeout` and Promise will be resolved.
 * Otherwise it will be rejected if element does not exist.
 *
 * If additionally `timeout` and `callback` is provided it executes given `callback` after given `timeout`.
 *
 * @param {string | number | boolean} key can be only: `string` | `number` | `boolean`
 * @param {any} value can be any type
 * @param {number} timeout after how much time in milliseconds element will be deleted
 * @param {(err: Error, key: string | number | boolean, value: any, timeout: number)} callback will be executed after given `timeout`
 *
 * @returns boolean or Promise
 */
export function put(
  key: string | number | boolean,
  value: any,
  timeout?: number,
  callback?: (err: Error, key: string | number | boolean, value: any, timeout: number) => any
): boolean | Promise<{ key: string | number | boolean; value: any; timeout: number }>;
