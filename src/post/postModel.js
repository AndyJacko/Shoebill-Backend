const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    postcomment: {
        type: String,
        required: true,
    },
    postpic:{
        type: String,
    },
    posteddate: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
    },
    rebarks: {
        type: Number,
    },
    numcomments: {
        type: Number,
    }
})

const Post = mongoose.model("post", postSchema);
module.exports = Post;