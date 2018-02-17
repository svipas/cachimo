const cachimo = require('../src/cachimo');

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
});
