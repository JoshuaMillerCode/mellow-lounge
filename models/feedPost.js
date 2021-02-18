const { Schema, model } = require('mongoose');

const postSchema = new Schema ({
    title: String,
    topic: String,
    entry: String
},{
    timestamps: true
})

const Post = model( 'Post', postSchema);

module.exports = Post;