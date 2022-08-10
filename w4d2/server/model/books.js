const mongoose = require('mongoose');
const {Schema} = mongoose;


const bookSchema = new Schema({
    title: String,
    isbn: String,
    publishedDate: String,
    author: String,
});

const Model = mongoose.model('Book', bookSchema);
module.exports = Model;


