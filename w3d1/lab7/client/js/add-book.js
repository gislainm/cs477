"use strict";
/*eslint-disable */
window.onload = function () {
    document.getElementById('add-button').onclick = addBook;
}
async function addBook(event) {
    event.preventDefault();
    const titleInput = document.getElementById('title');
    const isbn = document.getElementById('isbn');
    const date = document.getElementById('date');
    const author = document.getElementById('author');

    const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        body: JSON.stringify({
            title: titleInput.value,
            ISBN: isbn.value,
            publishedDate: date.value,
            author: author.value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await response.json();
    document.getElementById('book-add-form').reset();
    console.log(data);
    window.location = 'index.html';
}