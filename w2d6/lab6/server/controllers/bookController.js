"use strict";
/*eslint-disable */

let Book = require('../models/book');

exports.getAllBooks = (req, res, next) => {
    Book.getAllBooks().then(books => {
        res.json(books);
    });
};

exports.getBookById = (req, res, next) => {
    Book.getBookById(req.params.id)
        .then(book => {
            res.json(book);
        })
};

exports.addBook = (req, res, next) => {
    console.log(req.body)
    let book = new Book(null, req.body.title, req.body.ISBN, req.body.publishedDate, req.body.author)
    book.addBook().then(result => {
        book._id = result.insertedId;
        res.json(book);
    });

};

exports.update = (req, res, next) => {
    let id = req.params.id;
    let updatedBook = new Book(id, req.body.title, req.body.ISBN, req.body.publishedDate, req.body.author);
    updatedBook.update().then(result => {
        res.json(updatedBook);
    })
};

exports.deleteById = (req, res, next) => {
    let id = req.params.id;
    Book.deleteById(id).then(result => {
        res.json({ _id: id });
    });
}

