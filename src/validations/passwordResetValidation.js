const validator = require('validator')


const passwordResetValidation = (req,res,next) => {
    const {emailId} = req.body

    if(!emailId || !validator.isEmail(emailId)){
            return res.status(400).send("email is required")
    }

    next()
}

const resetPasswordValidation = (req,res,next) => {
    console.log("hitting----resetPasswordValidation")
    const {password} = req.body
    console.log("password----",password)
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }

    next()
}

module.exports = {passwordResetValidation,resetPasswordValidation}