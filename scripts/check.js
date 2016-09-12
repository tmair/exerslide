#!/usr/bin/env node
/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';
const path = require('path');
const packages = require('./packages');
const childProcess = require('child_process');

function run(cmd, options) {
  console.log(
    '  Running',
    options && options.cwd ? `in "${path.relative(process.cwd(), options.cwd)}":\n   ` : '',
    `"${cmd}"`
  );
  childProcess.execSync(
    cmd,
    Object.assign({stdio: ['inherit', 'ignore', 'inherit']}, options)
  );
}

function containsCommand(pkgPath, command) {
    const pkg = require(pkgPath);

    if (pkg.scripts) {
      return Object.keys(pkg.scripts).indexOf(command) > -1;
    }
}

packages.map(function(pkg) {
    console.log(pkg);
    return path.join(__dirname, '..', 'packages', pkg);
  })
  .forEach(function(pkg){
    run('npm install', {cwd: pkg});

   if (containsCommand(path.join(pkg, 'package.json'), "lint")) {
     run('npm run lint', {cwd: pkg})
   }

   if (containsCommand(path.join(pkg, 'package.json'), "test")) {
     run('npm run test', {cwd: pkg})
   } else {
     console.log(`Skipping '${pkg}' because it doesn\'t have any tests`);
   }
});

// Build example as smoke test

run('exerslide build', {cwd: path.join(__dirname, '../example')});
run('exerslide watch --smoke-test', {cwd: path.join(__dirname, '../example')});
run('exerslide serve --no-open-browser --smoke-test', {cwd: path.join(__dirname, '../example')});
