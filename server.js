const express = require("express");
const app = express();
const path = require('path'); 
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const BlogPost = require('./models/BlogPost.js');



mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true
})

app.set('view engine', 'ejs')

app.use(fileUpload());
//bodyparser deprecated
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(express.static('public')); 


///////////////////////////////
//CRUD ==> Create Read Update Delete

app.get('/', async (req,res) => {
   // pre ejs res.sendFile(path.resolve(__dirname, 'index.html'))
   const blogposts = await BlogPost.find({})
   res.render('index', {
       blogposts: blogposts
   });
   console.log(blogposts)
   console.log("blogposts")
});


// GET ONE 
app.get('/post/:id', async (req, res) =>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

// POST
app.post('/posts/store',async (req,res) =>{    
    let image = req.files.image
    image.mv(path.resolve(__dirname,'public/img',image.name),
        async (error)=>{
            await BlogPost.create({
                ...req.body,                // img
                image:'/img/' + image.name
            })
            res.redirect('/')
        })

})


// pages routes 
app.get('/about', (req,res) => {
    res.render('about');
})
app.get('/posts/new', (req, res)=>{
    res.render('create')
})

// initializating the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
    console.log(`Server runing on port ${PORT}`)
);