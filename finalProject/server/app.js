"use strict";
/*eslint-disable */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'styles')))
app.use(express.static(path.join(__dirname, '..', 'client', 'images')))
app.use(cors());
app.use(express.json());
app.use('/', userRouter);

mongoose.connect('mongodb://localhost:27017/Twitter')
    .then(() => {
        app.listen(3000, () => { console.log('welcome on Twitter') })
    })
