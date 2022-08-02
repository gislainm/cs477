"use strict";
/*eslint-disable */;
window.onload = function () {
    fetchBooks();
}

function fetchBooks() {
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => displayBooks(books))
        .catch(err => {
            console.log('inside err');
        })
}

function displayBooks(books) {
    let words = "whatever"
    const tbody = document.getElementById('books-table');
    let html = '';
    books.forEach(book => {
        html += `
            <tr id = "tr${book._id}">
                <th>${book._id}</th>
                <td>${book.title}</td>
                <td>${book.ISBN}</td>
                <td>${book.publishedDate}</td>
                <td>${book.author}</td>
                <td><button onclick="removeBook('${book._id}')" class="btn btn-primary">Delete</button> 
                <button onclick= "updateBook('${book._id}')" class="btn btn-primary">Update</button></td>
            </tr>
        `
    });

    tbody.innerHTML = html;
}

function removeBook(id) {
    fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE"
    }).then(response => {
        document.getElementById(`tr${id}`).remove();
    }).catch(err => {
        console.log(err);
    })
}

function updateBook(_id) {
    window.location = `./update-book.html?id=` + _id;
}