const {Router}=require("express");
const {createUser, readUsers, updateUser, deleteUser, loginUser}=require("./userControllers");
const {hashPass, tokenCheck, comparePass}=require("../middleware/");

const userRouter = Router()

userRouter.get("/readUser", readUsers);
userRouter.post("/createUser", hashPass, createUser);
userRouter.post("/loginUser", tokenCheck, loginUser);
userRouter.put("/updateUser", updateUser);
userRouter.delete("/deleteUser", deleteUser);

module.exports = userRouter