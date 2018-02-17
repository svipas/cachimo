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
