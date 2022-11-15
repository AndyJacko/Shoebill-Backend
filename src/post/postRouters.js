const {Router}=require("express")
const {createPost, readPost, updatePost, deletePost, updateLike}=require("./postControllers")

const postRouter = Router()

postRouter.get("/readPost", readPost);
postRouter.post("/createPost", createPost);
postRouter.put("/updatePost", updatePost);
postRouter.delete("/deletePost/:id", deletePost);

postRouter.put("/updateLike/:id", updateLike);

module.exports = postRouter

