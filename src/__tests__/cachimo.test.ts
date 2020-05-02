import * as cachimo from '../cachimo';

describe('cachimo', () => {
	beforeEach(() => {
		if (!cachimo.has('key')) {
			cachimo.put('key', 'value');
		}
	});

	describe('get', () => {
		it('should return value by given key', () => {
			expect(cachimo.get('key')).toBe('value');
			expect(cachimo.get('unknown')).toBeUndefined();
		});
	});

	describe('remove', () => {
		it('should remove stored element', () => {
			expect(cachimo.remove('key')).toBeTruthy();
			expect(cachimo.remove('key')).toBeFalsy();
		});
	});

	describe('has', () => {
		it('should return true if element exists', () => {
			expect(cachimo.has('key')).toBeTruthy();
			expect(cachimo.has('unknown')).toBeFalsy();
		});
	});

	describe('size', () => {
		it('should return number of elements', () => {
			expect(cachimo.size()).toBe(1);
		});
	});

	describe('keys', () => {
		it('should return all keys', () => {
			expect(cachimo.keys()).toEqual(['key']);
		});
	});

	describe('values', () => {
		it('should return all values', () => {
			expect(cachimo.values()).toEqual(['value']);
		});
	});

	describe('entries', () => {
		it('should return all entries (keys and values)', () => {
			expect(cachimo.entries()).toEqual([['key', 'value']]);
		});
	});

	describe('clear', () => {
		it('should remove all elements stored in cache', () => {
			expect(cachimo.clear()).toBe(1);
			expect(cachimo.clear()).toBe(0);
			expect(cachimo.size()).toBe(0);
		});

		describe('should clear all timeouts', () => {
			test('Promise', () => {
				cachimo.put('one', 'two', 1000).catch((err) => {
					expect(err).toBeInstanceOf(Error);
					expect(err.message).toBe('one timeout was already cleared.');
				});

				cachimo.clear();
			});

			test('callback', () => {
				cachimo.put('one', 'two', 1000, (err) => {
					expect(err).toBeInstanceOf(Error);
					expect(err.message).toBe('one timeout was already cleared.');
				});

				cachimo.clear();
			});
		});
	});

	describe('put', () => {
		it('should throw error if key type is invalid', () => {
			const invalidTypes = [null, undefined, NaN, {}, [], () => {}];
			invalidTypes.forEach((key) => expect(() => cachimo.put(key as any, '')).toThrowError());
		});

		it('should throw error if timeout type is invalid', () => {
			const invalidTypes = [NaN, {}, [], () => {}, '1', -1, 0, false, true];
			invalidTypes.forEach((timeout) => expect(() => cachimo.put('key', 'value', timeout as any)).toThrowError());
		});

		it('should throw error if callback type is invalid', () => {
			const invalidTypes = [NaN, {}, [], false, true, '', ' ', 1, -1, 0];
			invalidTypes.forEach((callback) => expect(() => cachimo.put('key', 'value', 1, callback as any)).toThrowError());
		});

		it('should return true if element was stored', () => {
			expect(cachimo.put('one', 'two')).toBeTruthy();

			cachimo.clear();
		});

		it('should return false if element was already stored with the same key', () => {
			expect(cachimo.put('key', 'value')).toBeFalsy();
		});

		describe('should throw error if element was removed before timeout', () => {
			test('Promise', () => {
				cachimo.put('one', 'two', 10).catch((err) => {
					expect(err).toBeInstanceOf(Error);
					expect(err.message).toBe("one doesn't exist.");
				});

				cachimo.remove('one');
			});

			test('callback', (done) => {
				cachimo.put('three', 'four', 10, (err) => {
					expect(err).toBeInstanceOf(Error);
					expect(err.message).toBe("three doesn't exist.");
					done();
				});

				cachimo.remove('three');
			});
		});

		describe('should return Promise or execute callback after given timeout', () => {
			test('Promise', async () => {
				const { key, timeout, value } = await cachimo.put('one', 'two', 1);
				expect(key).toBe('one');
				expect(value).toBe('two');
				expect(timeout).toBe(1);
			});

			test('callback', (done) => {
				cachimo.put('one', 'two', 1, (err, key, value, timeout) => {
					expect(err).toBeNull();
					expect(key).toBe('one');
					expect(value).toBe('two');
					expect(timeout).toBe(1);
					done();
				});
			});
		});
	});
});
