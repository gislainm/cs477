"use strict";
/*eslint-disable */

window.onload = function () {
    fetchTweets();
    document.getElementById('logoutBtn').onclick = logout;
    document.getElementById('searchBtn').onclick = searchUser;
    // document.getElementById('searchInput').addEventListener("keypress", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         document.getElementById("searchUser").click();
    //     }
    // });

}

async function fetchTweets() {
    console.log("we are on the tweets page")
    const response = await fetch(`http://localhost:3000/twitter/authenticate`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        }
    });

    const result = await response.json()

    if (result.error) {
        window.location = 'twitter';
    } else {
        document.getElementById('userName').innerHTML = result.data.username;
        sessionStorage.setItem('permission', JSON.stringify(result.data));
        const tweetPromise = await fetch("http://localhost:3000/twitter/tweets");
        const tweets = await tweetPromise.json();
        alert(JSON.stringify(tweets));
    }
}

function logout() {
    sessionStorage.removeItem('permission');
    sessionStorage.removeItem('accessToken');
    window.location = '/twitter';
}

async function searchUser() {
    let usrname = document.getElementById('searchInput').value;
    const response = await fetch(`http://localhost:3000/twitter/user/search`, {
        method: "POST",
        body: JSON.stringify({
            username: usrname
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const users = await response.json();
    alert(JSON.stringify(users));

}