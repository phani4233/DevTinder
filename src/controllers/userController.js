// Importing the User model from models folder
// This model is used to interact with the users collection in MongoDB
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginAction = async(req,res) => {
  try{
    const {emailId,password} = req.body
  
    const user = await User.findOne({emailId})
    if(!user){
      return res.status(400).send("invalid credentials")
    }

    const isPasswordMatch = await user.matchPasswords(password)
    if(!isPasswordMatch){
      return res.status(400).send("invalid credentials")
    }

    const token =await user.getJwt()
    res.cookie("token",token)
    res.send(user)

  }catch(err){
    res.status(400).json({
      success:false,
      message:err.message

    })

  }
}

const getProfileByCookie = async(req,res) => {
  try{
    user = req.user
    res.send(user)
  }catch(err){
    res.status(400).json({
      success: false,
      message: err.message
    });
  } 
}

// Controller function for signup API
// This function handles incoming signup requests
//
// req  -> contains request data from client
// res  -> used to send response back to client
//
// async is used because database operations take time
// and we use await inside this function
const sigupAction = async(req,res) => {

  // Printing incoming request body in console
  // Useful for debugging



  // Validation check
  //
  // req.body can be:
  // undefined
  // or an empty object {}
  //
  // Object.keys(req.body).length === 0
  // checks whether the object has any properties
  //
  // If body is empty, send error response
  if(!req.body || Object.keys(req.body).length === 0){

      // return is important here
      // because once response is sent,
      // function execution should stop
      return res.status(400).json({

      // success flag
      success: false,

      // error message
      message: "insuficient data"
    });
    
  }
  


  // try block is used to handle successful database operation
  try{
    const {firstName,lastName,emailId,password} = req.body
    // Creating a new mongoose document
    //
    // req.body data will be inserted into User model
    //
    // Example:
    // req.body = {
    //   name: "Phani",
    //   email: "abc@gmail.com"
    // }
    //
    // new User(req.body)
    // creates a mongoose object/document
    const passwordHash = await bcrypt.hash(password,10)
    console.log("passwordHash----",passwordHash)
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
    })


    // Saving document into MongoDB database
    //
    // await pauses execution until save operation completes
    await user.save()


    // Sending success response to client
    //
    // Means user was successfully stored in database
    res.send("user added successfully")



  }catch(err){

    // catch block executes if any error happens
    //
    // Possible errors:
    // - database connection failure
    // - validation errors
    // - duplicate data
    // - schema mismatch


    // Logging error message in backend console
    console.error("something went wrong,the error is :",err.message)


    // Sending error response to client
    res.status(400).json({

      // indicates request failed
      success: false,

      // actual error message
      message: err.message
    });
  }

}

const getUserByEmail = async(req,res) => {
    
    if(!req.body || Object.keys(req.body).length ===  0){
        return res.status(400).send("insuffient data")
    }

    console.log("email----",req.body)


    try{
    const {emailId:userEmailToFind} = req.body
    const user = await User.findOne({emailId:userEmailToFind})
        res.send(user)


    }catch(err){
        res.status(400).send("something might be wrong :",err.message)
    }
    

}

const deleteUserById = async(req,res) => {
    
    console.log("req---",req.body)
    const {userId} = req.body
    if(!req.body || Object.keys(req.body).length ===  0 || !userId){
      console.log("error----")
      return res.status(400).send("insufficient data")
    }

    try{
      await User.findByIdAndDelete(userId)
      res.send("user successfully deleted")

    }catch(err){
      res.status(400).send("something might be wrong :",err.message)
    }
}

  const updateUserDetails = async(req,res) => {
    if(!req.body || Object.keys(req.body).length ===  0){
          return res.status(400).send("insuffient data")
      }
    const userBody = req.body;
    console.log("userBody----",userBody)
    const userId = req.user._id
    console.log("userId----",userId)
    const ALLOWED_UPDATES = [
      "photoUrl","about","gender","age","skills","firstName","lastName"]

    const isUpdated = Object.keys(userBody).every((key) => ALLOWED_UPDATES.includes(key))
    if(!isUpdated){
      return res.status(400).send("update not allowed")
    }

    try{

      const newUser = await User.findByIdAndUpdate(userId,userBody,{returnDocument:'after',runValidators:'true'})
      res.send(newUser)

    }catch(err){
      res.status(400).send("something might be wrong :",err.message)
    }
  }



// Exporting controller function
//
// So that it can be imported in routes file
//
// Example:
// const { sigupAction } = require("../controllers/userController")
module.exports = {sigupAction,getUserByEmail,deleteUserById,updateUserDetails,loginAction,getProfileByCookie}