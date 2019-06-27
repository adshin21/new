"use strict"
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const profileController = require('./controllers/profile');
const storeProfileController = require('./controllers/storeProfile');
const userDetailsController = require('./controllers/getuser');

const app = express();

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true , useFindAndModify: false , useCreateIndex: true });

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);


app.use(expressSession({
    // cookie: {
    //     maxAge: 10000
    // },
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

const auth = require('./middlewares/auth');
const redirectIfAuthenticated = require('./middlewares/redirectIfAuthenticated');

app.get('/', homePageController);

app.get('/post/:id', getPostController);

app.get('/posts/new' , auth , createPostController);

app.post('/posts/store', auth , storePostController);

app.get('/auth/logout' , logoutController);

app.get('/auth/profile' , profileController);

app.post('/profile/store' , storeProfileController);

app.get('/auth/login' , redirectIfAuthenticated , loginController);

app.post('/users/login' , redirectIfAuthenticated , loginUserController);

app.get('/auth/register' , redirectIfAuthenticated , createUserController);

app.post('/users/register' ,redirectIfAuthenticated , storeUserController);

app.get('/users/:id' , userDetailsController);

app.listen(3000, () => {
    console.log(`http://localhost:${3000}`);
});