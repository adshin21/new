"use strict"
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const mongoose = require('mongoose');
const Post = require("./database/models/Post.js");
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/posts/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('image');

const app = express();

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });


app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', async (req, res) => {
    const post = await Post.find({});
    res.render('index', { post });
});


app.get('/about', (req, res) => {
    res.render('about');
});


app.get('/contact', (req, res) => {
    res.render('contact');
});


app.get('/post/:id', async (req, res) => {
    const post = await Post.findById({ _id: req.params.id });
    res.render('post', { post });
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/posts/new');
        }
        else{
            const data = req.body;
            const file = req.file;

            if(data.username && data.content && data.title && data.description && file){
                Post.create({
                    ...data,
                    image: `/posts/${file.filename}`
                });
                res.redirect('/');
            }
            else{
                res.redirect('/posts/new');
            }
            
        }

    });
});

app.listen(3000, () => {
    console.log('Server is listening on Port 3000');
});