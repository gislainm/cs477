"use strict";
/*eslint-disable */

/*
2. Create a web server that's going to send a response of big image (bigger then 3MB) to any client that sends a request to your specified 
server:port. Use the best way for performance. (Try to solve this in many different ways and inspect the loading time in the browser and 
send many requests to see the performance differences)
 */
const path = require('path');
const http = require('http');
const fs = require('fs');

// http.createServer((request, response) => {
//     fs.createReadStream(path.join(__dirname, 'space.jpeg')).pipe(response);
// }).listen(3000, () => { console.log('listening to port 3000') })

// const readableStream = fs.createReadStream(path.join(__dirname, 'space.jpeg'), {
//     highWaterMark: 16 * 1024
// });
// http.createServer((request, response) => {
//     readableStream.on('data', function (chunk) {
//         response.write(chunk);
//     })
// }).listen(3000, () => { console.log('listening to port 3000') })

http.createServer((req, res) => {
    res.end(fs.readFileSync(path.join(__dirname, 'space.jpeg')));
}).listen(3000,()=>{console.log('listening to 3000 .......')});