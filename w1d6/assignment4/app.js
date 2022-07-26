"use strict";
/*eslint-disable */
const express = require("express");
const path = require("path");
const fs = require("fs");
const exp = require("constants");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/mycss', express.static(path.join(__dirname, 'public', '404')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/users', (req, res, next) => {
    if (req.method === 'GET') {
        res.sendFile(path.join(__dirname, 'public', 'users', 'users.html'))
    } else if (req.method === 'POST') {
        console.log(req.body);
        fs.appendFileSync(path.join(__dirname, 'public', 'users', 'users.txt'), `username:${req.body.user},age:${req.body.age}\n`)
        res.redirect('/users/');
    }
})
app.use('/products', (req, res, next) => {
    if (req.method === 'GET') {
        res.sendFile(path.join(__dirname, 'public', 'products', 'products.html'))
    } else if (req.method === 'POST') {
        fs.appendFileSync(path.join(__dirname, 'public', 'products', 'products.txt'), `product:${req.body.product},quantity:${req.body.quantity}\n`)
        res.redirect('/products');
    }
})
app.use(function (err, req, res, next) {
    if (err) {
        res.status(500).send('whoops something went wrong');
    } else {
        next()
    }
})

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404', '404.html'));
})

app.listen(3000, () => { console.log('listening to 3000') });