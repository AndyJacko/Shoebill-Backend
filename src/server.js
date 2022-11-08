require("./db/conn")

const cors = require("cors")
const express = require("express")
const userRouter = require("./user/userRouters")

const app = express()
app.use(cors())

const port = process.env.PORT || 5001

app.use(express.json())

app.use(userRouter)

app.get("/health", (req, res) => {
    res.status(200).send({message: "API is working"})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})