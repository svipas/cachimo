## [Unreleased]

## 2.0.1 (May 2, 2020)

- Generate declaration file and include it in the `package.json`.

## 2.0.0 (May 2, 2020)

- Change indentation to tabs.
- Update all dependencies and add TypeScript.
- Drop ESLint.
- Replace CircleCI to Azure Pipelines.
- Rewrite everything to TypeScript.

## 1.0.7 (August 3, 2019)

- Update all dependencies.
- Fix ESLint error in tests.

## [1.0.6](https://github.com/svipben/cachimo/releases/tag/1.0.6) (2018-04-15)

### Added

- `jsconfig.json` file which represents project structure.
- `yarn-error.log` in `.gitignore`.

### Changed

- ⬆️ ESLint to 4.19.1.
- ⬆️ Jest to 22.4.3.

### Removed

- logo from `README.md`.

## [1.0.5](https://github.com/svipben/cachimo/releases/tag/1.0.5) (2018-03-10)

- Renamed `index.d.ts` to `cachimo.d.ts` and moved it to `src` dir.
- Deleted `index.js` and changed `main` in `package.json` to the `src/cachimo.js`
- Reduced logo width and height.
- ⬆️ `keywords` in `package.json`
- ⬆️ ESLint to 4.18.2
- ⬆️ Jest to 22.4.2

## [1.0.4](https://github.com/svipben/cachimo/releases/tag/1.0.4) (2018-02-17)

### Added

- `typings` property in `package.json`.

### Changed

- `clear()` function to also reject Promise or execute callback to inform if timeout was cleared.
- `README.md` to show how new `clear()` function works.
- Travis CI to also run ESLint before tests.
- Travis CI to disable email notifications.
- Tests to be more isolated.
- Moved all `index.js` code to the `src/cachimo.js`.

### Updated

- ⬆️ ESLint to 4.18.0
- ⬆️ Jest to 22.3.0

## [1.0.3](https://github.com/svipben/cachimo/releases/tag/1.0.3) (2018-02-17)

### Added

- Travis CI.
- Build status and NPM version badges in `README.md`.

### Changed

- `clear()` clears all timeouts as well. [#1](https://github.com/svipben/cachimo/issues/1)

## [1.0.2](https://github.com/svipben/cachimo/releases/tag/1.0.2) (2018-02-07)

### Added

- `CHANGELOG.md`.
- TypeScript declaration file (`index.d.ts`).

### Changed

- Minor change in `put(...)` JSDoc.
- `Error` to `TypeError` in `put(...)`.
- Logo to the new one. 😊
- `package.json` description to have dot at the end. 😑

## [1.0.1](https://github.com/svipben/cachimo/releases/tag/1.0.1) (2018-02-01)

- Initial release.
