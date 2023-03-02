# portchecktool-api

Unofficial https://www.portchecktool.com/ wrapper written in TypeScript

## Building

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
