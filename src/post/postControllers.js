const Post = require("./postModel");
const User = require("../user/userModel");

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    await User.updateOne(
      { _id: newPost.user },
      {
        $push: {
          posts: newPost._id,
        }
      }
    );

    res.status(201).send({ message: "Post Created", post: newPost });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readPost = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ posteddate: -1 });
    await Post.populate(posts, { path: "user" })
    res.status(200).send({ user: posts })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message })
  }
};

exports.updatePost = async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.body.userId },
      { [req.body.key]: req.body.value }
    );
    res.status(200).send({ message: "successfully update a Post" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message })
  }
};

exports.deletePost = async (req, res) => {
  console.log(req.params);
  try {
    await Post.deleteOne({_id: req.params.id});
    await User.updateOne({_id: req.body.userId}, {
      $pullAll: {
          posts: [req.params.id]
      },
  });
    res.status(200).send({ message: "successfully deleted a Post" })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.updateLike = async (req, res) => {
  try {
    await Post.updateOne(
      {_id: req.params.id},
      {
        $inc: {
          likes: 1
        }, 
        $pull: {
          likes : req.body.likes
        }});
      res.status(200).send({message: "successfully like is there"})
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};