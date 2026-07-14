const express = require('express')
const { signUpValidation } = require('../validations/signUpValidation')
const { sigupAction, loginAction } = require('../controllers/userController')
const { loginValidation } = require('../validations/loginValidation')
const {passwordResetValidation,resetPasswordValidation} = require('../validations/passwordResetValidation')
const {passwordResetTokenGeneration,resetPasswordAction} = require('../controllers/passwordResetController')

const authRouter = express.Router()

authRouter.post("/signup",signUpValidation ,sigupAction)

authRouter.post("/login",loginValidation,loginAction)

authRouter.post("/logout",(req,res) => {
    res.cookie('token',null,{expires:new Date(Date.now())})
    res.send("logout successfull")
})

authRouter.post("/forgot-password",passwordResetValidation,passwordResetTokenGeneration)

authRouter.post("/reset-password/:token",resetPasswordValidation,resetPasswordAction)


module.exports = {authRouter}


