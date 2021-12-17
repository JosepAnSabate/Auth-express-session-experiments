const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({ //schema represents how a collection looks like on atles
    title: String,
    body:String,
    datePosted: {/* can declare property type with an object like this beacuse we need 'default'*/
        type: Date,
        default: new Date()
    },
    image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema); 
//blogPost is a collection on mongo

module.exports = BlogPost;