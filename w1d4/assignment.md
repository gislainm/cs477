1. question 1
```javascript
const dns = require('node:dns');
dns.resolve4('www.miu.edu', function (err, address) {
    if (err) {
        throw new Error(err);
    } else {
        console.log(address);
    }
})
```
2. question 2
```javascript
const path = require('path');
const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    fs.createReadStream(path.join(__dirname, 'space.jpeg')).pipe(response);
}).listen(3000, () => { console.log('listening to port 3000') })


const readableStream = fs.createReadStream(path.join(__dirname, 'space.jpeg'), {
    highWaterMark: 16 * 1024
});
http.createServer((request, response) => {
    readableStream.on('data', function (chunk) {
        response.write(chunk);
    })
}).listen(3000, () => { console.log('listening to port 3000') })


http.createServer((req, res) => {
    res.end(fs.readFileSync(path.join(__dirname, 'space.jpeg')));
}).listen(3000,()=>{console.log('listening to 3000 .......')});
```
3. question 3
```javascript
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
```