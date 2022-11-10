const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  realname: { type: String },
  profilepic: { type: String },
  birthdate: { type: Date },
  joindate: { type: Date, default: Date.now },
  bio: { type: String },
  following: { type: Number, default: Math.ceil(Math.random() * 1000) },
  followers: { type: Number, default: Math.ceil(Math.random() * 1000) },
  location: { type: String },
  link: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  } else {
    throw new Error();
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

