#!/usr/bin/env node
'use strict';
const typescript = require("rollup-plugin-typescript");
const PrototypeMinify = require("rollup-plugin-prototype-minify");
const uglify = require("rollup-plugin-uglify").uglify;
const resolve = require("rollup-plugin-node-resolve");
const cssbundle = require("rollup-plugin-css-bundle");

const rollup = require('rollup');
const banner = "";
const transpiler = typescript({
  "module": "es2015",
  "target": "es3",
  "lib": ["es2015", "dom"],
  "exclude": "node_modules/**",
  "sourceMap": true,
});
const uglifyCode = uglify({
  sourcemap: true,
});


async function build() {
  const bundle = await rollup.rollup({
    input: 'src/index.ts',
    plugins: [
      transpiler,
      new PrototypeMinify({sourcemap: true}),
      resolve(),
      cssbundle({output: "./dist/index.css"}),
      uglifyCode,
    ],
  });


  // or write the bundle to disk
  await bundle.write( {
    file: `./dist/index.js`,
    banner,
    format: "iife",
    freeze: false,
    exports: "named",
    interop: false,
    sourcemap: true,
  });
}

build();