const cachimo = require('../src/cachimo');

test('promise', async () => {
  try {
    const promise = cachimo.put('key', 'value', 1000);
    expect(promise.constructor).toBe(Promise);

    expect(cachimo.put('key', 'value')).toBeFalsy();
    expect(cachimo.has('key')).toBeTruthy();
    expect(cachimo.get('key')).toBe('value');
    expect(cachimo.size()).toBe(1);

    const { key, value, timeout } = await promise;
    expect(key).toBe('key');
    expect(value).toBe('value');
    expect(timeout).toBe(1000);

    expect(cachimo.has('key')).toBeFalsy();
    expect(cachimo.get('key')).toBe(undefined);
    expect(cachimo.size()).toBe(0);
  } catch (err) {
    throw err;
  }
});

test('element remove before timeout', () => {
  const promise = cachimo.put('key', 'value', 1000);
  cachimo.remove('key');
  promise.catch(err => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('key does not exist');
  });
});
