"use strict";
/*eslint-disable */
const path = require('path');
const location = path.join('..', '.', 'resources', 'ytv')
console.log(location);

console.log('start')
const fs = require('fs')
let greetings = fs.readFileSync(path.join(__dirname, 'greetings.txt'), 'utf-8')
console.log('1: ' + greetings);

fs.readFile(path.join(__dirname, 'greetings.txt'), 'utf-8', function (err, data) {
    if (err) {
        //deal with error
        console.log(err);
    } else {
        console.log('2: ' + data);
    }
})
console.log('end');

fs.writeFile(path.join(__dirname, 'goodbye.txt'), 'I was nice meeting you!', function (err) {
    if (err) {
        console.log(err);
    }
})