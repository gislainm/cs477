"use strict";
/*eslint-disable */

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req,res)=>{
    if(req.url === '/' && req.method === 'GET'){
        //display signup form
        res.end('signup mode activated ........')
    }else if(req.url === '/signup' && req.method === 'POST'){
        //save to file
        res.end('save to file successfull .......')
    }else{
        res.end('others .......')
    }
}).listen(3000)