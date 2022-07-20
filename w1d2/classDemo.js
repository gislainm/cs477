"use strict"
/*eslint-disable */

setTimeout(() => console.log("timeout"));
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));

// const fs = require('fs');
// fs.readFile
