"use strict"
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');


const app = express();

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });


app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', homePageController);

app.get('/post/:id', getPostController);

app.get('/posts/new', createPostController);

app.post('/posts/store', storePostController);

app.get('/auth/register' , createUserController);

app.post('/users/register' , storeUserController);

app.listen(3000, () => {
    console.log('Server is listening on Port 3000');
});