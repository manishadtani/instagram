const express = require("express")
const app = express()
const userRouter = require("./routers/user.routes")
const postRouter = require("./routers/post.routes")
const indexRouter = require("./routers/index.routes")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/myfeed" , indexRouter)
app.use("/" , userRouter)
app.use("/posts" , postRouter)


module.exports = app;