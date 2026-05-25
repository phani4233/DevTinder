const mongoose = require('mongoose');

const connectDB = async () =>  {
    try{
        await mongoose.connect("mongodb+srv://phaninaga360_db_user:aiOGqb7LLcoYRClI@cluster0.hhi4hza.mongodb.net/")   
     
        console.log("Database connected successfully");
    }catch(err){
    console.error("Database connection failed:", error.message);
    }
}

module.exports = {connectDB}