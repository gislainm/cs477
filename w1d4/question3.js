"use strict";
/*eslint-disable */

/*
3. Using Node Stream API, create a script to unzip a file (after you zip it). (Use zlib.createGunzip() stream)
*/
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip()
// const readable = fs.createReadStream(path.join(__dirname, 'words.txt'));
// const compressed = fs.createWriteStream(path.join(__dirname, 'destination.txt.gz'));
// readable.pipe(gzip).pipe(compressed);

const unzippedFile = fs.createWriteStream(path.join(__dirname, 'unzipDest.txt'))
fs.createReadStream(path.join(__dirname, 'destination.txt.gz')).pipe(gunzip)
    .pipe(unzippedFile);