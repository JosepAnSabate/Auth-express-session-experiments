const express = require("express");
const app = express();
const path = require('path'); 
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash'); //flashing error message from session

const BlogPost = require('./models/BlogPost'); //
const validateMiddleware = require("./middleware/validationMiddleware");

const newPostController = require('./controllers/newPost');
const getPostsController = require('./controllers/getPosts');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware =require("./middleware/redirectIfAuthenticatedMiddleware")

mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true
});

app.set('view engine', 'ejs');

// declare a blobal var loggedIn that will be accessible
// from all ejs files. All will have acces lo loggedIn to 
// alter the navigation bar.
global.loggedIn = null; 

//bodyparser deprecated
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.static('public')); 
app.use(fileUpload());
app.use(flash());

app.use('/posts/store',validateMiddleware);
// register the expressSession middleware in our app and pass ina a config. object
// with a value to secret property. Secret string is used by the express session package to sign and encrypt the session id
// you can of course provide your own secret string
app.use(expressSession({
    secret: 'some secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 24 // Equals 1 day
    }
}))

// we specify with the wildcard*, that on all requests, this
// middleware should be executed. In it we assign loggedIn 
// to req.session.userId
app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})

///////////////////////////////
//Registration
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', storeUserController);
//Login
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', loginUserController)
//Logout
app.get('/auth/logout', logoutController)

//CRUD ==> Create Read Update Delete
app.get('/', getPostsController); //home page get all posts
// GET ONE 
app.get('/post/:id', getPostController);
// POST
app.post('/posts/store', authMiddleware ,storePostController);

// other pages routes 
app.get('/about', (req,res) => { res.render('about'); });  // sense controller
app.get('/posts/new', authMiddleware, newPostController);

// 404
app.use((req, res)=> res.render('notfound'));

// initializating the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
    console.log(`Server runing on port ${PORT}`)
);