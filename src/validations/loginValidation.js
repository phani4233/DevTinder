const validator = require('validator')

const loginValidation = (req,res,next) => {
    const {emailId,password} = req.body

    if(!emailId || !validator.isEmail(emailId)){
        return res.status(400).send("email is required")
    }

    if(!password){
        return res.status(400).send("email is required")
    }

    next()
}

module.exports = {loginValidation}