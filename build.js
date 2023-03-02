#!/usr/bin/node

const browserify = require('browserify')
const fs = require('fs')
const spawnSync = require('child_process').spawnSync

function buildModule() {
    // Lazy af
    console.log("Building NodeJS module...")
    spawnSync('tsc', ['--outDir', './dist/module/'])
}

const args = process.argv.slice(2)

buildModule()

if (args.includes('--browser')) {
    console.log("Browserifing...")
    browserify('./dist/module/index.js')
        .bundle()
        .pipe(fs.createWriteStream('./dist/portchecktool-api.js'))

    browserify('./dist/module/index.js')
        .transform('unassertify', { global: true })
        .transform('@browserify/envify', { global: true })
        .transform('@browserify/uglifyify', { global: true })
        .plugin('common-shakeify')
        .plugin('browser-pack-flat/plugin')
        .bundle()
        .pipe(require('minify-stream')({ sourceMap: true }))
        .pipe(fs.createWriteStream('./dist/portchecktool-api.min.js'))
}
