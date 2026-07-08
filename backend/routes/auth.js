const express = require("express")
const router = express.Router()

const authController = require("../controllers/auth.js")
const authentication = require('../middleware/authentication.js')

router.post("/register",authController.postRegister)
router.post("/login",authController.postLogin)
router.post("/logout",authController.postLogout)
router.get("/me",authentication,authController.getme)

module.exports = router