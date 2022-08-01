"use strict";
/*eslint-disable */

let Book = require('../models/book');

exports.getAllBooks = (req, res, next) => {
    res.json(Book.getAllBooks());
};

exports.getBookById = (req, res, next) => {
    let id = req.params.id
    res.json(Book.getBookById(id));
};

exports.addBook = (req, res, next) => {
    console.log(req.body)
    let newBook = new Book(null, req.body.title, req.body.ISBN, req.body.publishedDate, req.body.author).addBook();
    res.json(newBook);
};

exports.update = (req, res, next) => {
    let id = Number(req.params.id);
    let updatedBook = new Book(id, req.body.title, req.body.ISBN, req.body.publishedDate, req.body.author).update();
    res.json(updatedBook);
};

exports.deleteById = (req, res, next) => {
    let id = req.params.id;
    res.json(Book.deleteById(id));
}

