"use strict";
/*eslint-disable */
const { MongoClient } = require('mongodb');
let _db;

function mongoConnect(callback) {
    MongoClient.connect('mongodb://localhost:27017')
        .then(client => {
            _db = client.db('library');
            callback(client);
        }).catch(error => console.log(error));
}

function getDB() {
    if (_db) {
        return _db;
    } else {
        throw new Error('Database connection failed');
    }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;