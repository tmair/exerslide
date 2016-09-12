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
const fs = require('fs-extra');

const scriptpath = path.resolve(__dirname);
const packagespath = path.resolve(__dirname, path.join('..', 'packages'));

function pathExists(p) {
  try {
    fs.accessSync(p, fs.R_OK);
    return true;
  } catch(e) {
    return false;
  }
}

function hasPkg(dir) {
  return pathExists(path.join(packagespath, dir, 'package.json'));
}

module.exports = fs.readdirSync(packagespath)
 .filter(hasPkg);



