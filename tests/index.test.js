const cachimo = require('../index');

test('errors', () => {
  expect(() => cachimo.put(null)).toThrowError();
  expect(() => cachimo.put(undefined)).toThrowError();
  expect(() => cachimo.put(NaN)).toThrowError();
  expect(() => cachimo.put({})).toThrowError();
  expect(() => cachimo.put(() => {})).toThrowError();
  expect(() => cachimo.put('key', 'value', '1')).toThrowError();
  expect(() => cachimo.put('key', 'value', -1)).toThrowError();
  expect(() => cachimo.put('key', 'value', 1, 'function')).toThrowError();
});

test('common checks', () => {
  expect(cachimo.put('key', 'value')).toBeTruthy();
  expect(cachimo.put('key', 'value')).toBeFalsy();

  expect(cachimo.has('key')).toBeTruthy();
  expect(cachimo.has('unknown')).toBeFalsy();

  expect(cachimo.size()).toBe(1);

  expect(cachimo.get('key')).toBe('value');
  expect(cachimo.get('unknown')).toBe(undefined);

  expect(cachimo.keys()).toEqual(['key']);
  expect(cachimo.values()).toEqual(['value']);
  expect(cachimo.entries()).toEqual([['key', 'value']]);

  expect(cachimo.remove('key')).toBeTruthy();
  expect(cachimo.remove('key')).toBeFalsy();

  expect(cachimo.clear()).toBe(0);
  cachimo.put('key', 'value');
  expect(cachimo.clear()).toBe(1);
});

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

test('callback', done => {
  expect(
    cachimo.put('key', 'value', 1000, (err, key, value, timeout) => {
      expect(err).toBe(null);
      expect(key).toBe('key');
      expect(value).toBe('value');
      expect(timeout).toBe(1000);

      expect(cachimo.has('key')).toBeFalsy();
      expect(cachimo.get('key')).toBe(undefined);
      expect(cachimo.size()).toBe(0);

      done();
    })
  ).toBeTruthy();

  expect(cachimo.put('key', 'value')).toBeFalsy();
  expect(cachimo.has('key')).toBeTruthy();
  expect(cachimo.get('key')).toBe('value');
  expect(cachimo.size()).toBe(1);
});

test('element remove before timeout', done => {
  cachimo.put('key', 'value', 500, err => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('key does not exist');
    done();
  });
  cachimo.remove('key');

  const promise = cachimo.put('key', 'value', 1000);
  cachimo.remove('key');
  promise.catch(err => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('key does not exist');
  });
});

test('clear all timeouts', () => {
  cachimo.put('promiseKey', 'promiseValue', 1000).catch(err => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('promiseKey timeout was cleared');
  });

  cachimo.put('cbKey', 'cbValue', 2000, err => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('cbKey timeout was cleared');
  });

  cachimo.clear();
});
