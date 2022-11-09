const Post = require("./postModel")

exports.createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).send({user: newPost.user});
    } catch (error){
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

exports.readPost = async (req, res) => {
    try {
        const posts = await Post.find({})
        res.status(200).send({user: posts})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

exports.updatePost = async (req, res) => {
    try {
        await Post.updateOne(
            {user: req.body.user},
            {[req.body.key]: req.body.value}
        );
        res.status(200).send({message: "successfully update a Post"})
    } catch (error){
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

exports.deletePost = async (req, res) => {
    console.log(req.params)
    try {
        await Post.deleteOne({user: req.body.user})
        res.status(200).send({message: "successfully deleted a Post"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}