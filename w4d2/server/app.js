
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./router/userRouter');
const authRouter = require('./router/authRouter');
const bookRouter = require('./router/bookRouter');
const Response = require('./model/responseObj');

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use('/users',userRouter);
app.use('/books', bookRouter);




app.use((err, req, res, next) =>{
    res.status(500).send(new Response(true, err.message, null));
});

mongoose.connect('mongodb://127.0.0.1:27017/bookStore')
    .then(() =>{
        app.listen(3000);
    });
  
