"use strict";
/*eslint-disable */
const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((request, response) => {
    if (request.url === "/" && request.method === "GET") {
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(response);
        // response.sendFile()
    } else if (request.url === '/blogpost' && request.method === 'POST') {
        const body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        });
        request.on('end', () => {
            const str = Buffer.concat(body).toString();
            const newArr = str.split('&')
            const title = newArr[0].split('=')[1].split('+').join(' ');
            const blogBody = newArr[1].split('=')[1].split('+').join(' ');
            fs.writeFile('blog.txt', `${title}\n${blogBody}`, (err) => {
                if (err) {
                    response.write('<html>')
                    response.write('<head><title>save failed</title></head>')
                    response.write("<body><a href='http://localhost:3000/'>Try again</a></body>")
                    response.write('</html>')
                } else {
                    response.write('<html>')
                    response.write('<head><title>Blog saved</title></head>')
                    response.write("<body><label><b>Saved Successfully</b></label><br><a href='http://localhost:3000/'>Return to Homepage</a></body>")
                    response.write('</html>')
                    response.end()
                }
            })
        })
    }
}).listen(3000, () => console.log('listening to 3000 ...........'))