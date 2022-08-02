"use strict";
/*eslint-disable */
window.onload = function () {
    let url = new URL(location.href);
    const prodId = url.searchParams.get('id');
    fetchBookById(prodId);
    document.getElementById('update-button').onclick = function (event) {
        event.preventDefault();
        updateBook(prodId);
    }
}

function fetchBookById(_id) {
    fetch('http://localhost:3000/books/' + _id)
        .then(response => response.json())
        .then(book => {
            document.getElementById('title').value = book.title;
            document.getElementById('isbn').value = book.ISBN;
            document.getElementById('date').value = book.publishedDate;
            document.getElementById('author').value = book.author;
        })
}
function updateBook(_id) {
    fetch('http://localhost:3000/books/' + _id, {
        method: 'PUT',
        body: JSON.stringify({
            title: document.getElementById('title').value,
            ISBN: document.getElementById('isbn').value,
            publishedDate: document.getElementById('date').value,
            author: document.getElementById('author').value
        }),
        headers: {
            'content-Type': 'application/json'
        }
    }).then(response => {
        console.log(response.json());
        window.location = 'index.html';
    }).catch(error => console.log(error));
}; 