"use strict";
/*eslint-disable */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bookRouter = require('./routes/book');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/books', bookRouter);

app.use((req, res, next) => {
    res.status(404).send({ error: 'API NOT SUPPORTED' });
});

app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});

mongoose.connect('mongodb://localhost:27017/library')
    .then(() => {
        app.listen(3000);
    });
