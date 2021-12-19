const BlogPost = require('../models/BlogPost.js')

//homePage

//getallposts
module.exports = async (req,res) => {
    const blogposts = await BlogPost.find({}).populate('userid')
    console.log(req.session)
    const sessionUserId = req.session.userId //user id for my posts
    res.render('index', {
        blogposts,
        sessionUserId
    });
}