"use strict";
/*eslint-disable */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    ISBN: { type: String, required: true },
    publishedDate: Date,
    author: String
})

const Model = mongoose.model('Book', bookSchema);

module.exports = Model;