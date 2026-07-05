const express = require('express')
const { adminAuth } = require('../middlewares/auth')
const { getProfileByCookie, updateUserDetails } = require('../controllers/userController')
const profileRouter = express.Router()

profileRouter.use("/",adminAuth)

profileRouter.get("/profile",getProfileByCookie)

profileRouter.patch("/profile",updateUserDetails)

module.exports = {profileRouter}

