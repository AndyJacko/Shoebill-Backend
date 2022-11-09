const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    realname: {
        type: String,
    },
    profilepic: {
        type: String,
        // No space?
    },
    birthdate: {
        type: Date,
        
        // No space?
    },
    joindate: {
        type: Date,
        default: Date.now,
        // No space?
    },
    bio: {
        type: String,
        
    },
    following: {
        type: Number,
        default: Math.ceil(Math.random()*1000)
        // ?,
        // No space?
    },
    followers: {
        type: Number,
        default: Math.ceil(Math.random()*1000)
        // ?,
        // No space?
    },
    location: {
        type: String,
        // ?
    },
    link: {
        type: String,
        link: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username})
    if (user && await bcrypt.compare(password, user.password)) {
        return user
    } else {
        throw new Error()
    }
}

const User = mongoose.model("User", userSchema)

module.exports = User