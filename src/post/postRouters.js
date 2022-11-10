const {Router}=require("express")
const {createPost, readPost, updatePost, deletePost}=require("./postControllers")

const postRouter = Router()

postRouter.get("/readPost", readPost);
postRouter.post("/createPost", createPost);
postRouter.put("/updatePost", updatePost);
postRouter.delete("/deletePost", deletePost);

module.exports = postRouter

