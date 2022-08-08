"use strict";
/*eslint-disable */

window.onload = function () {
    fetchTweets();
    document.getElementById('backHome').onclick = goBackHome;
    document.getElementById('userProfile').onclick = fetchProfile;
    document.getElementById('userInfo').onclick = displayUserInfo;
    document.getElementById('following').onclick = displayFollowing;
    document.getElementById('followers').onclick = displayFollowers;
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
        fetchProfile()
    }
}

function changeToUnfollow(username) {
    document.getElementById("followBtn," + username).style.display = "none";
    document.getElementById("unfollowBtn," + username).style.display = "block";
}
async function unfollow(usrname) {
    let [, username] = usrname.split(",");
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
        fetchProfile()
    }
}
async function unfollowProfile(usrname) {
    let [, username] = usrname.split(",");
    const response = await fetch("http://localhost:3000/twitter/unfollow", {
        method: "POST",
        body: JSON.stringify({
            currentUser: JSON.parse(sessionStorage.getItem("permission")).username,
            userToUnfollow: username
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    if (result.error) {
        console.log(result.message);
    } else {
        document.getElementById(`specUser,${username}`).style.display = "none";
        let currentFollowing = Number(document.getElementById('followingNbr').innerHTML);
        document.getElementById('followingNbr').innerHTML = currentFollowing - 1;
    }
}


function changeToFollow(username) {
    document.getElementById("followBtn," + username).style.display = "block";
    document.getElementById("unfollowBtn," + username).style.display = "none";
}

async function fetchProfile() {
    const user = JSON.parse(sessionStorage.getItem("permission")).username;
    const followingContainer = document.getElementById('followingContainer');
    followingContainer.innerHTML = "";
    const followersContainter = document.getElementById('followersContainer');
    followersContainter.innerHTML = "";
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


    //Display all the following
    if (!userProfile.data.following.length) {
        let html = `<div class="userToFollow">
                    <div class="usrname">
                        <div class="names">Follow People for a better experience</div>
                    </div>
                </div>`
        followingContainer.innerHTML = html;
    } else {
        userProfile.data.following.forEach(user => {
            let html = `<div class="userToFollow" id="specUser,${user.username}">
                        <div class="usrname">
                            <div class="names">${user.firstName} ${user.lastName}</div>
                            <div class="username">${user.username}</div>
                        </div>
                        <div>
                            <button class="btn btn-primary unfollowBtnProfile" id="unfollowBtnProfile,${user.username}" onclick="unfollowProfile(this.id)">Unfollow</button>
                        </div>
                    </div>`
            followingContainer.innerHTML += html;
        })
    }

    //Display all the followers
    if (!userProfile.data.followers.length) {
        let html = `<div class="userToFollow">
                    <div class="usrname">
                        <div class="names">You Have No Followers</div>
                    </div>
                </div>`
        followersContainter.innerHTML = html;
    } else {
        userProfile.data.followers.forEach(user => {
            let html = `<div class="userToFollow">
                        <div class="usrname">
                            <div class="names">${user.firstName} ${user.lastName}</div>
                            <div class="username">${user.username}</div>
                        </div>
                    </div>`
            followersContainter.innerHTML += html;
        })
    }

    document.getElementById('fname').innerHTML = userProfile.data.firstName;
    document.getElementById('lname').innerHTML = userProfile.data.lastName;
    document.getElementById('usrname').innerHTML = userProfile.data.username;
    document.getElementById('email').innerHTML = userProfile.data.email;
    document.getElementById('phone').innerHTML = userProfile.data.phoneNumber;
    document.getElementById('gender').innerHTML = userProfile.data.gender;
    document.getElementById('djt').innerHTML = moment(userProfile.data.dateJoined).format("MMM Do YYYY");
}

function displayUserInfo() {
    document.getElementById('userInfo').style.backgroundColor = 'rgba(134, 128, 128, 0.151)';
    document.getElementById('following').style.backgroundColor = '';
    document.getElementById('followers').style.backgroundColor = '';
    document.getElementById('userInfoContent').style.display = 'block';
    document.getElementById('followingContent').style.display = 'none';
    document.getElementById('followersContent').style.display = 'none';
}

function displayFollowing() {
    document.getElementById('userInfo').style.backgroundColor = '';
    document.getElementById('following').style.backgroundColor = 'rgba(134, 128, 128, 0.151)';
    document.getElementById('followers').style.backgroundColor = '';
    document.getElementById('userInfoContent').style.display = 'none';
    document.getElementById('followingContent').style.display = 'block';
    document.getElementById('followersContent').style.display = 'none';
}

function displayFollowers() {
    document.getElementById('userInfo').style.backgroundColor = '';
    document.getElementById('following').style.backgroundColor = '';
    document.getElementById('followers').style.backgroundColor = 'rgba(134, 128, 128, 0.151)';
    document.getElementById('userInfoContent').style.display = 'none';
    document.getElementById('followingContent').style.display = 'none';
    document.getElementById('followersContent').style.display = 'block';
}

function goBackHome() {
    window.location.reload();
}