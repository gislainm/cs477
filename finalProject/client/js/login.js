"use strict";
/*eslint-disable */
let HOSTNAME = 'http://localhost:3000/twitter';

window.onload = function () {
    document.getElementById("signin").onclick = displaySigninForm;
    document.getElementById('exit').onclick = hideSigninForm;
    document.getElementById('loginbtn').onclick = login;
}

function displaySigninForm() {
    document.getElementById('signinForm').style.display = 'flex';
}
function hideSigninForm() {
    document.getElementById('signinForm').style.display = 'none';
    document.getElementById('invalidEmail').style.display = 'none';
    document.getElementById('invalidPassword').style.display = 'none';
    document.getElementById('userEntry').value = '';
    document.getElementById('password').value = '';
}

async function login() {
    let HOSTNAME = 'http://localhost:3000/twitter';
    let userEntry = document.getElementById('userEntry').value;
    let password = document.getElementById('password').value;
    if (!password) {
        document.getElementById('invalidPassword').style.display = 'inline-block';
    }
    if (!userEntry) {
        document.getElementById('invalidEmail').style.display = 'inline-block';
    }
    if (userEntry && password) {
        document.getElementById('invalidEmail').style.display = 'none';
        document.getElementById('invalidPassword').style.display = 'none';
        const response = await fetch(`http://localhost:3000/twitter/login`, {
            method: 'POST',
            body: JSON.stringify({
                userEntry,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result.error) {
            document.getElementById('wrongInfo').innerHTML = result.message;
            console.log(result.message);
        } else {
            document.getElementById('wrongInfo').innerHTML = '';
            sessionStorage.setItem('accessToken', result.data.accessToken);
            goToHome();
        }
    } else if (userEntry) {
        document.getElementById('invalidEmail').style.display = 'none';
    } else if (password) {
        document.getElementById('invalidPassword').style.display = 'none';
    }

}

async function goToHome() {
    let authorization = sessionStorage.getItem('accessToken');
    console.log(authorization);
    window.location = 'twitter/home'
}