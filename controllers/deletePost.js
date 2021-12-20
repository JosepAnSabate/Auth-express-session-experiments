const BlogPost = require('../models/BlogPost.js')

module.exports = async (req,res) => {
    const id = req.params.id;

   await BlogPost.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/'})
        })
        .catch(err => {
            console.log(err);                                                                
        })
}