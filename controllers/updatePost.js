const BlogPost = require('../models/BlogPost.js')

module.exports = async (req,res) => {
    try {
    const id = req.params.id;
    const updatetitle = req.title;
    const updatebody = req.body;

    const options = { new: true }

    const blogupdate = await BlogPost.findByIdAndUpdate(id, updatetitle, updatebody, options)
    
    res.send(blogupdate);
    } catch (error) {
        console.log(error.message);
    }
    res.render('myposts')
}