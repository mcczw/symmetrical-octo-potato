const mongoose = require('mongoose');

// Blog Schema
const blogSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
    body:{
		type: String,
        required: true
	},
    slug: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        comment: String,
        approved: {
            type: Boolean,
            default: false
        },
        created_at: Date
		
	}],
	category:[{
		type: String
	}]
});

const Blog = module.exports = mongoose.model('Blog', blogSchema);

//Getall 
module.exports.getBlogs = (callback, limit) => {
    const blog = Blog.find(callback).limit(limit);
    blog.populate('author', 'name');
    blog.populate('comments.user_id', 'name');
    return blog;
}

// Get Blog - findById
module.exports.getBlogById = (id, callback) =>{
    const blog = Blog.findById({"_id":id}, callback);
    blog.populate('author', 'name');
    blog.populate('comments.user_id', 'name');

    return blog;
}

// Add a blog - create
module.exports.addBlog = (newBlog,callback) =>{
	Blog.create([newBlog], callback);
}

// Update a blog - findoneandupdate
module.exports.updateBlog = (filter, newBlog, options, callback)=>{
	Blog.findOneAndUpdate({"_id":filter}, newBlog, {new: true}, callback);
}

// Delete a blog - deleteOne method
module.exports.removeBlog = (id, callback) => {
	Blog.deleteOne({"_id": id}, callback);
}

