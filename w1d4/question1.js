"use strict";
/*eslint-disable */
const dns = require('node:dns');
/*
1. Create a simple Node script that converts 'www.miu.edu' domain name to the equivalent IP address. (Search and learn 'dns' module, resolve4)
*/

dns.resolve4('www.miu.edu', function (err, address) {
    if (err) {
        throw new Error(err);
    } else {
        console.log(address);
    }
})





