"use strict"
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const mongoose = require('mongoose');
const Post = require("./database/models/Post.js");
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/blog' ,{ useNewUrlParser: true });


app.set('views' , path.join(__dirname , '/views/'));
app.engine('hbs' , exphbs({ extname: 'hbs' , defaultLayout: 'mainLayout' , layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine' , 'hbs');

app.use(express.static('public'));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));


app.get('/' , async (req , res) => {
    const post = await Post.find({});
    res.render('index' , { post });
});


app.get('/about' , (req , res) => {
    res.render('about');
});


app.get('/contact' , (req , res) => {
    res.render('contact');
});


app.get('/post' , (req , res) => {
    res.render('post');
});

app.get('/posts/new' , (req , res) => {
    res.render('create', { validate : true});
});

app.post('/posts/store' , (req , res) => {
    const data = req.body;
    Post.create({
        username : data.username,
        title : data.title,
        description : data.description,
        content : data.content
    });

    res.redirect('/');
})
app.listen(3000 , () => {
    console.log('Server is listening on Port 3000');
});