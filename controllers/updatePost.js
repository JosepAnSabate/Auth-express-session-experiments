const BlogPost = require('../models/BlogPost.js')

module.exports = async (req,res) => {
    try {
    const idPost = req.params.idpost;
    const updatetitle = req.title;
    const updatebody = req.body;

    const options = { new: true }

    const blogpost = await BlogPost.findByIdAndUpdate(idPost,{
        title: updatetitle,
        body: updatebody
    })
        //id, updatetitle, updatebody, options)
    console.log(blogpost);
    res.send(blogpost);
    } catch (error) {
        console.log(error.message);
    }
    res.render('post', {
        blogpost
    })
}