const express = require("express");
const app = express();
const path = require('path'); 
const ejs = require('ejs');

app.set('view engine', 'ejs')


app.use(express.static('public')); 


app.get('/', (req,res) => {
   // pre ejs res.sendFile(path.resolve(__dirname, 'index.html'))
   res.render('index');
})

app.get('/about', (req,res) => {
    res.render('about');
})

// initializating the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
    console.log(`Server runing on port ${PORT}`)
);