"use strict"
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');


const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');



const app = express();

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

const mongoStore = connectMongo(expressSession);


app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));


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

app.get('/auth/login' , loginController);

app.post('/users/login' , loginUserController);

app.get('/auth/register' , createUserController);

app.post('/users/register' , storeUserController);


app.listen(3000, () => {
    console.log('Server is listening on Port 3000');
});