"use strict";
/*eslint-disable */
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('1 This middleware always run!');
    next()
});

app.use('/add-product', (req, res, next) => {
    console.log('2 In the middleware!');
    res.send('<h1>The "Add Product" Page</h1>')
});

app.use('/', (req, res, next) => {
    console.log('3 In another middleware!');
    res.send('<h1>Hello from Express</h1>');
});

app.listen(3000, console.log('3000..........'));