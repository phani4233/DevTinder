const { get } = require("mongoose")
const User = require("../models/user")

const getFullFeed = async(req,res) => {
    const allUsers =  await User.find()

    res.send(allUsers)


}

module.exports = {getFullFeed}