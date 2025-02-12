const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const userMiddleware = require("../middlewares/user.middleware")

router.post("/register", userController.registerController)


router.post("/login", userController.loginController)

router.get("/profile", userMiddleware.authuser, userController.profileController)


module.exports = router