"use strict";
/*eslint-disable */
let HOSTNAME = 'http://localhost:3000/twitter';

window.onload = function () {
    document.getElementById("signin").onclick = displaySigninForm;
    document.getElementById('exit').onclick = hideSigninForm;
    document.getElementById('loginbtn').onclick = login;
    document.getElementById("exitsignUp").onclick = hideSignUpForm;
    document.getElementById('signupEmail').onclick = displaySignUpForm;
    document.getElementById('signUpbtn').onclick = signUpUser;
    document.getElementById('errorMessage').style.display = 'none';
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

function goToHome() {
    window.location = 'home.html';
    // let username = JSON.parse(sessionStorage.getItem('permission')).username;
    // console.log(username);
    // document.getElementById('userName').innerHTML = username;

}

function hideSignUpForm() {
    document.getElementById('signupForm').style.display = 'none';
}

function displaySignUpForm() {
    document.getElementById('signupForm').style.display = 'flex';
}
function signUpUser() {
    document.getElementById('errorMessage').innerHTML = '';
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password1 = document.getElementById('password1').value;
    let password2 = document.getElementById('password2').value;
    let gender;
    let genderArr = document.getElementsByName('gender');
    for (let element of genderArr) {
        if (element.checked) {
            gender = element.value
        }
    }
    if (firstname && lastname && username && email && phone && password1 && password2 && gender && (password1 === password2)) {
        if (password2.length < 8) {
            document.getElementById('errorMessage').innerHTML = "password not long enough, password input has to be atleast 8 letters";
            document.getElementById('errorMessage').style.display = 'block';
        } else {
            registerUser(firstname, lastname, username, email, phone, password1, gender);
        }
    } else if (password1 !== password2) {
        document.getElementById('errorMessage').innerHTML = "Your password input doesn't match";
        document.getElementById('errorMessage').style.display = 'block';
    } else {
        document.getElementById('errorMessage').innerHTML = "all fields have to be filled";
        document.getElementById('errorMessage').style.display = 'block';
    }

}

async function registerUser(fname, lname, username, email, phone, password, gender) {
    const response = await fetch('http://localhost:3000/twitter/signup', {
        method: 'POST',
        body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            username: username,
            email: email,
            password: password,
            phoneNumber: phone,
            gender: gender
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    if (result.error) {
        document.getElementById('errorMessage').innerHTML = result.message;
        document.getElementById('errorMessage').style.display = 'block';
    } else {
        // const res = await fetch(`http://localhost:3000/twitter/login`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         userEntry: result.email,
        //         password: password
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // const permission = await res.json();
        // sessionStorage.setItem('accessToken', permission.data.accessToken);
        // goToHome();
        window.location = '/twitter';
    }

}