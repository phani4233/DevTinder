const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const {Schema,model} = mongoose

const userSchema = new Schema({
    firstName:{type:String,
        required:true,
        minLength:4,
        maxLength:100,
    },
    lastName:{type:String},
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address"+value)
            }
        }
    },
    password:{type:String},
    age:{
        type:Number,
        min: 18,

    },
    gender:{type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("photo url not valid")
            }
        }
    },
    about:{
        type:String,
        default:"theres nothing about me"
    },
    skills:{type:[String]}



},{
    timestamps:true
})

userSchema.methods.getJwt = async function () {
    const user = this;
    const token = jwt.sign({_id:user._id},"Phani!@34",{ expiresIn: '1d' })
    return token
}

userSchema.methods.matchPasswords = async function (password){
    const user = this;
    const isMatch = await bcrypt.compare(password,user.password)
    return isMatch
}

const User = new model('User',userSchema)

module.exports = User;