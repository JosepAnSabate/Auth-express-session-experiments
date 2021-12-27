const express = require('express');
const router = express.Router();

const BlogPost = require('../models/BlogPost'); //
const validateMiddleware = require("../middleware/validationMiddleware");

const newPostController = require('../controllers/newPost');
const getPostsController = require('../controllers/getPosts');
const getPostController = require('../controllers/getPost');
const storePostController = require('../controllers/storePost');
const newUserController = require('../controllers/newUser');
const storeUserController = require('../controllers/storeUser')
const loginController = require('../controllers/login')
const loginUserController = require('../controllers/loginUser');
const logoutController = require('../controllers/logout');
const deletePostController = require('../controllers/deletePost');

const updatePostController = require('../controllers/updatePost');


const getUserPostsController = require('../controllers/getUserPosts');

const authMiddleware = require("../middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware =require("../middleware/redirectIfAuthenticatedMiddleware");


//Registration
router.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
router.post('/users/register', storeUserController);
//Login
router.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
router.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
//Logout
router.get('/auth/logout', logoutController)

//CRUD ==> Create Read Update Delete
router.get('/', getPostsController); //home page get all posts
// GET ONE 
router.get('/post/:id', getPostController);
//GET USERS POST
router.get('/post/user/:userid', authMiddleware ,getUserPostsController)
// POST
router.post('/posts/store', authMiddleware ,storePostController); //fetch from form!
//DELETE
router.delete('/post/:id', authMiddleware, deletePostController)
//UPDATE
router.put('/post/update/:id', authMiddleware, updatePostController)

// other pages routes 
router.get('/about', (req,res) => { res.render('about'); });  // sense controller
router.get('/posts/new', authMiddleware, newPostController);


module.exports =  router;