"use strict";
/*eslint-disable */

const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/book');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/books', bookRouter);
app.use((req, res, next) => {
    res.status(404).send({ error: 'API NOT SUPPORTED' });
});

app.listen(3000, () => console.log('listening to 3000...'));