"use strict";
/*eslint-disable */
const { getDB } = require('../utils/database');
const { ObjectId } = require('mongodb')

module.exports = class Books {
    constructor(id, title, ISBN, publishedDate, author) {
        this._id = id;
        this.title = title;
        this.ISBN = ISBN;
        this.publishedDate = publishedDate;
        this.author = author;
    }
    static getAllBooks() {
        return getDB().collection('books').find().toArray();
    }
    static getBookById(id) {
        return getDB().collection('books').findOne({ _id: new ObjectId(id) });
    }

    addBook() {
        return getDB().collection('books').insertOne(this)
    }
    update() {
        let self = Object.assign({}, this);
        delete self._id;
        return getDB().collection('books').updateOne({ _id: new ObjectId(this._id) }, { $set: self })
    }
    static deleteById(id) {
        return getDB().collection('books').deleteOne({ _id: new ObjectId(id) });

    }
}