// ------------------------------------------------------------
// Import the Mongoose library.
//
// Mongoose is an ODM (Object Data Modeling) library for MongoDB.
// It provides:
// 1. Connection management
// 2. Schema definitions
// 3. Data validation
// 4. Query APIs for interacting with MongoDB
// ------------------------------------------------------------
const mongoose = require("mongoose");

// ------------------------------------------------------------
// Function: connectDB
//
// Purpose:
// Establish a connection between the Node.js application
// and the MongoDB Atlas database.
//
// Why async?
// mongoose.connect() returns a Promise because creating a
// database connection is an asynchronous operation.
//
// async allows us to use 'await' for cleaner code.
// ------------------------------------------------------------
const connectDB = async () => {

    // --------------------------------------------------------
    // Log message indicating that the application is attempting
    // to connect to MongoDB.
    //
    // Useful for debugging and understanding the application's
    // startup flow.
    // --------------------------------------------------------
    console.log("Attempting to connect to MongoDB...");

    try {

        // ----------------------------------------------------
        // Establish a connection to MongoDB Atlas.
        //
        // mongoose.connect():
        // - Opens a connection to the database.
        // - Returns a Promise.
        // - Resolves when the connection succeeds.
        // - Throws an error if the connection fails.
        //
        // Common failure reasons:
        // - Incorrect connection string
        // - Invalid username/password
        // - IP address not whitelisted in Atlas
        // - Network issues
        // - Atlas cluster unavailable
        //
        // NOTE:
        // In production, this URL should be stored in an
        // environment variable instead of hardcoding it.
        // ----------------------------------------------------
        await mongoose.connect(
            "mongodb+srv://phaninaga360_db_user:aiOGqb7LLcoYRClI@cluster0.hhi4hza.mongodb.net/devTinder"
        );

        // ----------------------------------------------------
        // This line executes only if the database connection
        // was established successfully.
        //
        // At this point:
        // - MongoDB Atlas is reachable
        // - Credentials are valid
        // - Application is ready to perform database operations
        // ----------------------------------------------------
        console.log("Database connected successfully");

    } catch (err) {

        // ----------------------------------------------------
        // This block executes if any error occurs while trying
        // to connect to MongoDB.
        //
        // Examples:
        // - Authentication failure
        // - Network timeout
        // - Invalid connection string
        // - IP not added to Atlas Network Access
        //
        // err.message contains the actual error description.
        // ----------------------------------------------------
        console.error(
            "Database connection failed:",
            err.message
        );
    }
};

// ------------------------------------------------------------
// Export the connectDB function.
//
// This allows other files to import and use it:
//
// const { connectDB } = require("./config/database");
//
// Typically called before starting the Express server.
// ------------------------------------------------------------
module.exports = { connectDB };