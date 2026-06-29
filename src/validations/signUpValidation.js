const validator = require('validator')

const signUpValidation = (req,res,next) => {
    const {body} = req
    const {firstName,lastName,emailId,password} = body
    if(!firstName?.trim() || !lastName?.trim()){
        return res.status(400).send("name is required")
    }

    if(!emailId || !validator.isEmail(emailId)){
        return res.status(400).send("email is not proper type")
    }

    if(!password || !validator.isStrongPassword(password)){
        return res.status(400).send("password is not proper type")
    }

    next()
}

module.exports = {signUpValidation}