
window.onload = function(){
    fetchBooks();
}

async function fetchBooks(){
   const response = await fetch('http://localhost:3000/books',{
        method: 'GET',
        headers:{
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type':'application/json'
        }
    });
    const result = await response.json();
   
   displayBooks(result.data);
}

function displayBooks(books){
    let tbody = document.getElementById('tbody');
    books.forEach(element => {
        tbody.innerHTML += `
        <tr id="tr${element._id}">
            <th scope="row">${element._id}</th>
            <td>${element.title}</td>
            <td>${element.isbn}</td>
            <td>${element.publishedDate}</td>
            <td>${element.author}</td>
            <td><button type="button" class="btn btn-primary" onClick="editBook('${element._id}')">Edit</button></td>
            <td><button type="button" class="btn btn-primary" onClick="deleteBook('${element._id}')">Delete</button></td>
          </tr>
        `;
    });
       
   
};

function deleteBook(id){
    fetch('http://localhost:3000/books/'+id,{
        method:'DELETE'
    }).then(response=>{
        document.getElementById(`tr${id}`).remove();
    }).catch(err=>console.log(err));

}
function editBook(id){
    window.location = 'edit-book.html?id='+id;
}