const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB Connected...");
  } catch (err) {
    console.log(err);
  }
};

connection();
