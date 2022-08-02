"use strict";
/*eslint-disable */

let Book = require('../models/book');
let { ObjectId } = require('mongodb');

exports.getAllBooks = async (req, res, next) => {
    res.json(await Book.find());
};

exports.getBookById = async (req, res, next) => {
    res.json(await Book.findById(req.params.id));
};

exports.addBook = async (req, res, next) => {
    try {
        const book = await new Book(req.body).save();
        res.json(book);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    const result = await Book.updateOne({ _id: new ObjectId(req.params.id) }, req.body);
    res.json(result);
};

exports.deleteById = async (req, res, next) => {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.json(deletedBook);
}

