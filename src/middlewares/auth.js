const jwt = require('jsonwebtoken')
const User = require("../models/user")

const adminAuth = async(req,res,next) => {
  try{
    const {token} = req.cookies
    console.log("token----",token)
    if (!token){
      return res.status(400).json({
        success:false,
        message:"message something went wrong please try again"
      })
    }

    const decodedData = jwt.verify(token,"Phani!@34")
    const {_id} = decodedData
    const user  = await User.findById(_id)
    if(!user){
       return res.status(400).json({
        success:false,
        message:"message something went wrong please try again"
      })
    }

    req.user = user
    next()
  }catch(err){
    res.status(401).send("something went wrong please try again"+err)
  }
}

const userAuth = (req,res,next) => {

  console.log("checking if user is authenticated or not")

  let token = "xyz"
  let userIsAuthenticated = token === "xyz"
  if(userIsAuthenticated){
    next()
  }else{
    res.status(401).send("user not authenticated")
  }
}

module.exports = {
    adminAuth,
    userAuth
}