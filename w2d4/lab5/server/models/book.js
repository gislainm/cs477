"use strict";
/*eslint-disable */

const books = [
    { "id": 1, "title": "A Short History of Nearly Everything", "ISBN": "288936986-2", "publishedDate": "2/13/2017", "author": "Eleonora Featherstone" },
    { "id": 2, "title": "A Brief History of Time", "ISBN": "549090163-2", "publishedDate": "9/6/2019", "author": "Menard McRobbie" },
    { "id": 3, "title": "Cosmos", "ISBN": "727483712-5", "publishedDate": "4/11/2022", "author": "Evan Gabler" },
    { "id": 4, "title": "The Selfish Gene", "ISBN": "583797402-4", "publishedDate": "1/15/2021", "author": "Estel Willard" },
    { "id": 5, "title": "Guns, Germs, and Steel: The Fates of Human Societies", "ISBN": "489929111-6", "publishedDate": "11/3/2017", "author": "Erasmus Roskell" },
    { "id": 6, "title": "The Origin of Species", "ISBN": "117871518-3", "publishedDate": "4/2/2019", "author": "Nancey Dinse" },
    { "id": 7, "title": "Thinking, Fast and Slow", "ISBN": "620728267-1", "publishedDate": "8/29/2015", "author": "Waldon Wasteney" },
    { "id": 8, "title": "The Universe in a Nutshell", "ISBN": "409618349-0", "publishedDate": "6/9/2020", "author": "Johny Dandison" },
    { "id": 9, "title": "Outliers: The Story of Success", "ISBN": "082889700-X", "publishedDate": "6/24/2020", "author": "Margaretta Wainscoat" },
    { "id": 10, "title": "The Culture Code: The Secrets of Highly Successful Groups", "ISBN": "892446166-4", "publishedDate": "11/22/2018", "author": "Leonard Guerrero" }
]
let counter = 11;

module.exports = class Books {
    constructor(id, title, ISBN, publishedDate, author) {
        this.id = id;
        this.title = title;
        this.ISBN = ISBN;
        this.publishedDate = publishedDate;
        this.author = author;
    }
    static getAllBooks() {
        return books;
    }
    static getBookById(id) {
        let index = books.findIndex((book) => book.id == id);
        if (index <= -1) {
            throw new Error(`Book with ID: ${id} cannot be found`);
        } else {
            return books[index];
        }
    }

    addBook() {
        this.id = counter++;
        books.push(this);
        return this;
    }
    update() {
        let bookIndex = books.findIndex(book => book.id == this.id)
        if (bookIndex < -1) {
            throw new Error(`Book with ID: ${this.id} cannot be found`);
        } else {
            books[bookIndex] = this;
            return this;
        }
    }
    static deleteById(id) {
        let bookIndex = books.findIndex(book => book.id == id);
        if (bookIndex < -1) {
            throw new Error(`Book with ID: ${id} cannot be found`);
        } else {
            let temp = books[bookIndex];
            books.splice(bookIndex, 1);
            return temp;
        }
    }
}