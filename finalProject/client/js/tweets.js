"use strict";
/*eslint-disable */

//load tweets page
let pageNo = 0;
function tryFunc() {
    let container = document.getElementById('tweetsPage');
    //console.log(container.scrollTop, container.scrollHeight, container.offsetHeight)
    if (container.offsetHeight > container.scrollHeight - container.scrollTop - 1) {
        createTweets();
    }
}

window.onload = function () {
    fetchTweets();
    document.getElementById('saveTweet').onclick = saveTw;
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

//fetch all the tweets from the database
async function fetchTweets() {
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
        createTweets();
    }
};

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

//fetch information from the database to create a profile page for the current user
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
    document.getElementById('followingNbr').innerHTML = userProfile.data.following.length - 1;
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
            if (user.username !== JSON.parse(sessionStorage.getItem("permission")).username) {
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
            }
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

//Go back to the home page from the profile Page 
function goBackHome() {
    window.location.reload();
}

//Deleting a tweet if you are on your page
async function deleteTw(obj) {
    let id = obj.getAttribute('data-delete');
    console.log("the id is  ", id)
    await fetch('http://localhost:3000/twitter/tweets', {
        method: "DELETE",
        body: JSON.stringify({
            userId: JSON.parse(sessionStorage.permission).id,
            postId: id
        }),
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}

//Save tweets in the database and post it on the user's homepage
async function saveTw(event) {
    event.preventDefault();
    const userid = JSON.parse(sessionStorage.permission).id;
    let content = document.getElementById('tweetContent').value;
    let youtube = '';
    if (content.includes('youtube.com')) {
        let copy = content.split(" ");
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].includes('youtube.com')) {
                youtube = copy[i].replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
                content = content.replace(copy[i], ' ')
            }
        }
    }
    const timePosted = new Date(Date.now());
    await fetch('http://localhost:3000/twitter/tweets', {
        method: 'POST',
        body: JSON.stringify({
            content: content,
            user: userid,
            timePosted: timePosted,
            youtube: youtube
        }),
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        }
    });
    document.getElementById('tweetContent').value = " ";
    location.reload();
}

//create the tweets page and load it with fetched tweets
async function createTweets() {
    let userId = JSON.parse(sessionStorage.permission).id;
    const tweetPromise = await fetch(`http://localhost:3000/twitter/tweets/${userId}/${pageNo}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    pageNo++;
    const tweets = await tweetPromise.json();
    if (tweets.length > 0) {
        let html = '';
        //let html= document.getElementById("tweets").innerHTML;
        tweets.forEach(element => {
            let deleteBtn = `<button data-delete="${element._id}" class="btn btn-outline-light" onclick="deleteTw(this)" >Delete</button>`;
            let time = element.timePosted;
            let postedAt = moment(time).fromNow();
            if (element.youtube) {
                html += `<div class="post">
                <div class="post_profile-image">
        <img src="/images/user.png" alt="user profile picture">
    </div>
    <div class="post_body">
        <div class="post_header">
            <div class="post_header-text">
                <h3>${element.user.username}
                    <span class="header-icon-section">
                        <span class="material-icons post_badge">verified</span>${postedAt}
                    </span>
                </h3>
            </div>
            <div class="post_header-discription">
                <p>${element.content}</p>
                <br>
                <iframe width="560" height="315" src="${element.youtube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
        <div class="post_footer" style="width:78%" >
            <span class="material-icons">chat</span>
            <span class="material-icons">repeat</span>
            <span class="material-icons">favorite_border</span>
            <div name="forDelete"></div>
        </div>
        </div>
    </div>`}
            else {
                html += `<div class="post">
                <div class="post_profile-image">
        <img src="/images/user.png" alt="java-logo">
    </div>
    <div class="post_body">
        <div class="post_header">
            <div class="post_header-text">
                <h3>${element.user.username}
                    <span class="header-icon-section">
                        <span class="material-icons post_badge">verified</span>${postedAt}
                    </span>
                </h3>
            </div>
            <div class="post_header-discription">
                <p>${element.content}</p>
                <br>
            </div>
        </div>
        <div class="post_footer" style="width:78%">
            <span class="material-icons">chat</span>
            <span class="material-icons">repeat</span>
            <span class="material-icons">favorite_border 123</span>
            <div name="forDelete"></div>
        </div>
        </div>
    </div>`
            }
            if (userId === element.user._id) {
                html = html.replace('<div name="forDelete"></div>', deleteBtn)
            }
        });
        let loading = '<div id="theEnd" style="color:white; text-align:center; padding:3%">Loading more...</div>'
        let oldContent = document.getElementById("tweets").innerHTML;
        if (oldContent.includes(loading)) {
            oldContent = oldContent.replace(loading, " ")
        }
        document.getElementById("tweets").innerHTML = ''
        document.getElementById("tweets").innerHTML = oldContent + html + loading;
    }
    else {
        document.getElementById("theEnd").innerHTML = '<p class="alert alert-primary">Sorry &#128543  No more tweets to load. Please follow more Twitter users.</p>'
        document.getElementById("tweetsPage").removeAttribute("onscroll");
    }
}