# portchecktool-api

Unofficial https://www.portchecktool.com/ wrapper written in TypeScript

## Building

You must have TypeScript & dependencies installed (and optionally all dev dependencies to build for browser)

### Automatically

```
./build.js
```

> Append `--browser` to browserify the built module.

### Manually

As a NodeJS module:

```bash
tsc --outDir ./dist/module/
```

and to bundle for browsers:

```bash
browserify -o ./dist/portchecktool-api.js ./dist/module/index.js
```

## License

[MIT](./LICENSE)
