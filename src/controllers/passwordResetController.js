const User = require("../models/user")
const crypto = require("crypto");
const bcrypt = require('bcrypt')




const passwordResetTokenGeneration = async(req,res) => {

    try{
    const {emailId} = req.body
    const user = await User.findOne({emailId})
        if(!user){
            return res.status(200).json({
        success: true,
        message: "If an account exists, a password reset link has been sent."
      });
        }
    const token  = await   user.getPasswordResetToken()
    console.log("passwordResetToken----",token)

    res.send({
        status:"success",
        url:`/password-reset/${token}`
    })


    }catch(err){
      res.status(500).json({
       success:false,
       message:err.message
      })
    }
}

const resetPasswordAction = async(req,res) => {
    try{
        const token = req.params.token
        console.log("token---",token)
        const {password} = req.body
        console.log("password----",password)
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        const user =await User.findOne({
            passwordResetToken:hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        })

        console.log("user----",user)

            if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token."
            });
        }
        
        const passwordHash = await bcrypt.hash(password,10)
        
        user.password = passwordHash
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save();

        res.send({
            status:"success",
            message:"password reset successfull"
        })


    }catch(err){
        res.status(500).json({
       success:false,
       message:err.message
      })
    }
}

module.exports = {passwordResetTokenGeneration,resetPasswordAction}