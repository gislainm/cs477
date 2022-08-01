"use strict";
/*eslint-disable */
const express = require('express');
const path = require('path');
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res, next) => {
    res.send(
        `<HTML>
        <body>
        <form action="/signup"  method="post">
        <label>firstname: <input type="text" name="firstname"></label><br>
        <label>lastname: <input type="text" name="lastname"></label><br>
        <input type="submit" value="submit">
        </form>
        </body>
        </HTML>`
    )
})

app.post('/signup', (req, res, next) => {
    if (req.body.firstname && req.body.lastname) {
        fs.appendFile(path.join(__dirname, 'database.txt'), `,${req.body.firstname}= ${req.body.lastname}`, (err) => {
            if (err) {
                throw new Error("save failed");
            } else {
                res.send('saved successfully');
            }
        })
    } else {
        res.send(
            `<HTML>
            <body>
            <form action="/signup"  method="post">
            <label>firstname: <input type="text" name="firstname"></label><br>
            <label>lastname: <input type="text" name="lastname"></label><br>
            <input type="submit" value="submit">
            </form>
            <p>Firstname and Lastname required</p>
            </body>
            </HTML>`
        )
    }
})

app.use((req, res, next) => {
    res.status(404).send("URL doesn't exist, try again!");
})

app.use(function (err, req, res, next) {
    res.status(500).send(err.message);

})

app.listen(8080);