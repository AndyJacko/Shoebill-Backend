const { Router } = require("express");
const { createUser, readUsers, updateUser, deleteUser, loginUser, readRandomUsers, readUserOne } = require("./userControllers");

const { hashPass, tokenCheck, comparePass } = require("../middleware/");

const userRouter = Router();

userRouter.get("/readUser", readUsers);
userRouter.get("/readUser/:limit", readRandomUsers);
userRouter.post("/createUser", hashPass, createUser);
userRouter.post("/loginUser", tokenCheck, loginUser);
userRouter.put("/updateUser", updateUser);
userRouter.delete("/deleteUser/:id", deleteUser);

userRouter.get("/readUserOne/:id", readUserOne);

module.exports = userRouter;

