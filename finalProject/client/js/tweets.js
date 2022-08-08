"use strict";
/*eslint-disable */

window.onload = function () {
    fetchTweets();
    document.getElementById('userProfile').onclick = fetchProfile;
    document.getElementById('searchBtn').onclick = searchUser;
    document.getElementById('searchInput').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchUser();
        }
    })
    $("#currentUser").popover({
        html: true,
        placement: "top",
        title: 'would you like to Logout?',
        content: '<div id="logout">Logout</div>'
    });
    $('#currentUser').on('shown.bs.popover', function () {
        $("#logout").on('click', function () {
            logout();
        });
    });

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
        document.getElementById('userName').innerHTML += result.data.username;
        sessionStorage.setItem('permission', JSON.stringify(result.data));
        const tweetPromise = await fetch("http://localhost:3000/twitter/tweets");
        const tweets = await tweetPromise.json();
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
            currentUserId: JSON.parse(sessionStorage.getItem("permission")).id,
            username: usrname
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const users = await response.json();
    document.getElementById('usersContainer').innerHTML = ''
    document.getElementById('usersContainer').style.display = "flex";
    if (users.error) {
        let usersContainer = document.getElementById('usersContainer');
        usersContainer.innerHTML = users.message;
    } else {
        if (users.data.following.length) {
            let usersContainer = document.getElementById('usersContainer');
            users.data.following.forEach(user => {
                let html = `<div class="userToFollow">
                    <div class="usrname">
                        <div class="names">${user.firstName} ${user.lastName}</div>
                        <div class="username">${user.username}</div>
                    </div>
                    <div>
                        <button class="btn btn-primary followBtn" id="followBtn,${user.username}" onclick="follow(this.id)" style="display:none">Follow</button>
                        <button class="btn btn-primary unfollowBtn" id="unfollowBtn,${user.username}" onclick="unfollow(this.id)" style="display:block">Unfollow</button>
                    </div>
                </div>`
                usersContainer.innerHTML += html;
            });
        }
        if (users.data.notFollowing.length) {
            let usersContainer = document.getElementById('usersContainer');
            users.data.notFollowing.forEach(user => {
                let html = `<div class="userToFollow">
                    <div class="usrname">
                        <div class="names">${user.firstName} ${user.lastName}</div>
                        <div class="username">${user.username}</div>
                    </div>
                    <div>
                        <button class="btn btn-primary followBtn" id="followBtn,${user.username}" onclick="follow(this.id)" style="display:block">Follow</button>
                        <button class="btn btn-primary unfollowBtn" id="unfollowBtn,${user.username}" onclick="unfollow(this.id)" style="display:none">Unfollow</button>
                    </div>
                </div>`
                usersContainer.innerHTML += html;
            });
        }
    }
}

async function follow(usrname) {
    let [, username] = usrname.split(",");
    const response = await fetch("http://localhost:3000/twitter/follow", {
        method: "POST",
        body: JSON.stringify({
            currentUser: JSON.parse(sessionStorage.getItem("permission")).username,
            userToFollow: username
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    if (result.error) {
        console.log(result.message);
    } else {
        changeToUnfollow(username);
    }
}

function changeToUnfollow(username) {
    document.getElementById("followBtn," + username).style.display = "none";
    document.getElementById("unfollowBtn," + username).style.display = "block";
}
async function unfollow(usrname) {
    let [, username] = usrname.split(",");
    alert(username);
    const response = await fetch("http://localhost:3000/twitter/unfollow", {
        method: "POST",
        body: JSON.stringify({
            currentUser: JSON.parse(sessionStorage.getItem("permission")).username,
            userToUnfollow: username
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    if (result.error) {
        console.log(result.message);
    } else {
        changeToFollow(username);
    }
}
function changeToFollow(username) {
    document.getElementById("followBtn," + username).style.display = "block";
    document.getElementById("unfollowBtn," + username).style.display = "none";
}

async function fetchProfile() {
    const user = JSON.parse(sessionStorage.getItem("permission")).username;
    const userFetch = await fetch(`http://localhost:3000/twitter/user/${user}`);
    const userProfile = await userFetch.json();
    document.getElementById('profilePage').style.display = 'block';
    document.getElementById('tweetsPage').style.display = 'none';
    document.getElementById('followersNbr').innerHTML = userProfile.data.followers.length;
    document.getElementById('followingNbr').innerHTML = userProfile.data.following.length;
    document.getElementById('usernames').innerHTML = `
        ${userProfile.data.firstName} ${userProfile.data.lastName}
        <span class="material-icons post_badge">verified</span>
        <span class="header-icon-section username">
            ${userProfile.data.username}
        </span>`
    document.getElementById('fname').innerHTML = userProfile.data.firstName;
    document.getElementById('lname').innerHTML = userProfile.data.lastName;
    document.getElementById('usrname').innerHTML = userProfile.data.username;
    document.getElementById('email').innerHTML = userProfile.data.email;
    document.getElementById('phone').innerHTML = userProfile.data.phoneNumber;
    document.getElementById('gender').innerHTML = userProfile.data.gender;
    document.getElementById('djt').innerHTML = moment(userProfile.data.dateJoined).format("MMM Do YYYY");
    // const tweetsPage = document.getElementById('tweetsPage');
    // const HTML = `
    // <div class="header">
    //         <h2>Profile</h2>
    //     </div>
    //     <div id="profileContainer">
    //     <div id="header">
    //         <div id="userInfo" class="profileHeader">
    //             User Info
    //         </div>
    //         <div id="following" class="profileHeader">
    //             Following
    //             <div>${userProfile.data.following.length}</div>
    //         </div>
    //         <div id="followers" class="profileHeader">
    //             Followers
    //             <div>${userProfile.data.followers.length}</div>
    //         </div>
    //     </div>
    //     <div id="userInfoContent">
    //         <div class="post profileHeader">
    //             <div class="user_profile-image">
    //                 <img src="/images/user.png" alt="user-profile">
    //                 <div class="post_body">
    //                     <div class="post_header">
    //                         <div class="post_header-text">
    //                             <h3 class="usernames">${userProfile.data.firstName} ${userProfile.data.lastName}
    //                                 <span class="material-icons post_badge">verified</span>
    //                                 <span class="header-icon-section username">
    //                                     ${userProfile.data.username}
    //                                 </span>
    //                             </h3>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="post profilBody">
    //             Firstname: <label class="profilebodyContent">${userProfile.data.firstName}</label>
    //         </div>
    //         <div class="post profilBody">
    //             Lastname: <label class="profilebodyContent">${userProfile.data.lastName}</label>
    //         </div>
    //         <div class="post profilBody">
    //             Username: <label class="profilebodyContent">${userProfile.data.username}</label>
    //         </div>
    //         <div class="post profilBody">
    //             Email: <label class="profilebodyContent">${userProfile.data.email}</label>
    //         </div>
    //         <div class="post profilBody">
    //             Phone Number: <label class="profilebodyContent">${userProfile.data.phoneNumber}</label>
    //         </div>
    //         <div class="post profilBody">
    //             Gender: <label class="profilebodyContent">${userProfile.data.gender}</label>
    //         </div>
    //         <div class="post profilBody">
    //             Date Joined Twitter: <label class="profilebodyContent">${moment(userProfile.data.dateJoined).format("MMM Do YYYY")}</label>
    //         </div>
    //     </div>
    //     <div id="followingContent">
    //         following go here
    //     </div>
    //     <div id="followersContent">
    //             followers go here
    //     </div>
    // </div>
    // `
    // tweetsPage.innerHTML = HTML;
    document.getElementById('userInfo').onclick = displayUserInfo;
    document.getElementById('following').onclick = displayFollowing;
    document.getElementById('followers').onclick = displayFollowers;
}

function displayUserInfo() {
    document.getElementById('userInfoContent').style.display = 'block';
    document.getElementById('followingContent').style.display = 'none';
    document.getElementById('followersContent').style.display = 'none';
}

function displayFollowing() {
    document.getElementById('userInfoContent').style.display = 'none';
    document.getElementById('followingContent').style.display = 'block';
    document.getElementById('followersContent').style.display = 'none';
}

function displayFollowers() {
    document.getElementById('userInfoContent').style.display = 'none';
    document.getElementById('followingContent').style.display = 'none';
    document.getElementById('followersContent').style.display = 'block';
}