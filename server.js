require("dotenv").config();
require("./src/db/conn");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 5001;

app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).send({ message: "API is working..." });
});

app.listen(port, () => {
  console.log(`Server Connected On Port: ${port}...`);
});
