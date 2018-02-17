const cachimo = require('../src/cachimo');

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
