const User = require("./userModel");
const jwt = require("jsonwebtoken");
const Post = require("../post/postModel")
const bcrypt = require ("bcrypt")

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.JWT_KEY);
    res.status(201).send({ user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.readUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ username: 1 })
    res.status(200).send({ user: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.readRandomUsers = async (req, res) => {
  try {
    const readUsers = await User.aggregate([
      { $sample: { size: +req.params.limit } },
    ]);

    if (readUsers[0]) {
      res.status(200).send({ users: readUsers });
    } else {
      res.status(404).send({ message: `No Users Found` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readUserOne = async (req, res) => {
  try{
    const user = await User.findOne({_id: req.params.id});
    await Post.populate(user, { path: "posts" });
    res.status(200).send({user: user})
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}

exports.updateUser = async (req, res) => {
  if (req.body.password && req.body.password.trim() !== "") {
    const hash = await bcrypt.hash(req.body.password, 8)
    req.body.password = hash
  }
  
  try {
    await User.updateOne(
      {_id: req.body.id},
      req.body
    )
    res.status(200).send({message: "Successfully updated user."})
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    await Post.deleteMany({ user: req.params.id });
    res.status(200).send({ message: "successfully deleted a user" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).send({ user: req.user });
    } else {
      const user = await User.findByCredentials(
        req.body.username,
        req.body.password
      );
      const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      res.status(200).send({
        user: user,
        token,
        text: "Successfuly logged in",
        
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
