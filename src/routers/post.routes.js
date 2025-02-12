const express = require("express")
const router = express.Router()
const userMiddleware = require("../middlewares/user.middleware")
const postController = require("../controllers/postController")

router.post("/createpost", userMiddleware.authuser, postController.postCreateController)



module.exports = router
