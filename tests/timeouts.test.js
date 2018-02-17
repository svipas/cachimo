const cachimo = require('../src/cachimo');

test('clear all timeouts (callback)', () => {
  cachimo.put('key', 'value', 1000, err => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('key timeout was cleared');
  });

  cachimo.clear();
});

test('clear all timeouts (promise)', () => {
  cachimo.put('key', 'value', 1000).catch(err => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('key timeout was cleared');
  });

  cachimo.clear();
});
