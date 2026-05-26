// Import the Express library
// Express is a lightweight framework used to build web servers in Node.js
const express = require("express");
const {connectDB} =require("./config/database")
const {adminAuth,userAuth} = require("./middlewares/auth")
const User = require("./models/user")

// Create an Express application instance
// 'app' is the main object used to define routes and middleware
const app = express();

app.get("/user",userAuth,(req,res) => {
    console.log("userDetails---",req.query)
    res.send({name:"phani",age:"25"})

})

app.post("/signup",async(req,res) => {
  const user = new User({
    firstName:"Porandla",
    lastName:"Naga Phani",
    emailId:"porandlanagaphani@gmail.com",
    age:"age"
  })

  try{
    await user.save()
    res.send("user added successfully")
  }catch(err){
    console.error("something went wrong,the error is :",err.message)
     res.status(400).json({
      success: false,
      message: err.message
    });
  }
  

  

})

app.use("/",(err,req,res,next) => {
    if(err){
        res.status(500).send("something went wrong please try again")
    }
})

// app.get("/",(req,res) => {
//     res.send("hello this is app.get")
    
// })

// app.post("/simplePost",(req,res) => {
//     res.send("you are hitting the post request")
// })

// Default middleware for "/"
// ⚠️ IMPORTANT NOTE ABOUT ORDER:
// Express executes routes/middleware in a TOP → DOWN order.
// This "/" route is very generic and matches ALL paths ("/", "/test", "/abc", etc.).
// Because it comes BEFORE "/test", it will handle EVERY request first
// and send a response immediately.
//
// 👉 Once res.send() is called, Express will NOT continue to the next route.
// 👉 So any routes defined AFTER this (like "/test") will NEVER be reached.
//
// In short:
// This acts like a "catch-all" and blocks all routes below it.
// app.use("/", (req, res) => {

//     // 'req' → contains request details (URL, headers, params, etc.)
//     // 'res' → used to send a response back to the client

//     // If no earlier route matches, this response will be sent
//     // BUT since this is placed first, it matches everything immediately
//     res.send("Hello World Welcome to DevTinder");
// });

// Route-specific middleware for "/test"
// ⚠️ NOTE:
// Even though "/test" is more specific, it is placed AFTER "/".
//
// When a request comes to "/test":
// 1. Express checks routes from top
// 2. "/" matches "/test" as well
// 3. Response is sent there itself
// 4. This block NEVER executes ❌
//
// 👉 This route will only work if it is placed BEFORE the "/" route

// app.use(
//   "/test",

//   // 🔹 First middleware function
//   (req, res, next) => {
//     console.log("logging the test resp 1");

//     // 👉 next() is VERY IMPORTANT:
//     // It tells Express:
//     // "I'm done with this middleware, move to the next one"

//     // If you DON'T call next():
//     // ❌ The request will hang (no response sent)
//     // ❌ Next handler will NOT execute
//     // if i uncomment the next line function retuns "sfsfsf" and next will be called and and next request handler will be executed and error will be throw saying
//     //Cannot set headers after they are sent to the client
//     // res.send("sfsfsf")
//     next(); // passes control to the next handler
//   },

//   // 🔹 Second middleware / final handler
//   (req, res) => {
//     console.log("logging the test response 2");

//     // 👉 This is where the actual response is sent
//     // Only ONE response should be sent per request

//     res.send("test response 2");

//     // ⚠️ IMPORTANT:
//     // After sending response, you should NOT call next()
//     // because response is already finished
//   }
// );

app.use("/admin",adminAuth)

app.get ("/admin/getAllData",(req,res) => {
 
    res.send("sending all the data and the user is admin")
 
})

app.delete("/admin/deleteUser",(req,res) => {
  res.send("user deleted successfully")

})


// ------------------------------------------------------------
// Step 1: Attempt to establish a connection to MongoDB
//
// connectDB() is an asynchronous function that returns a Promise.
//
// Possible outcomes:
// ✅ Promise resolves  -> Database connection successful
// ❌ Promise rejects   -> Database connection failed
//
// We use .then() and .catch() to handle these outcomes.
// ------------------------------------------------------------
connectDB()

  // ----------------------------------------------------------
  // Step 2: This block runs ONLY if the database connection
  // was established successfully.
  //
  // We start the Express server only after MongoDB is ready.
  //
  // Why?
  // Imagine a user hits an API endpoint that needs to read
  // data from MongoDB. If the server starts before the DB is
  // connected, those requests could fail.
  //
  // Therefore:
  // 1. Connect to MongoDB
  // 2. Start the Express server
  // ----------------------------------------------------------
  .then(() => {

    // --------------------------------------------------------
    // Start the Express server and listen for incoming HTTP
    // requests on port 3000.
    //
    // After this, users can access:
    // http://localhost:3000
    // --------------------------------------------------------
    app.listen(3000, () => {

      // ------------------------------------------------------
      // This callback executes once the server has started
      // successfully and is ready to accept requests.
      // ------------------------------------------------------
      console.log("Server is successfully running");
    });
  })

  // ----------------------------------------------------------
  // Step 3: This block runs if MongoDB connection fails.
  //
  // Common reasons:
  // - Wrong MongoDB connection string
  // - Invalid username/password
  // - Current IP address not whitelisted in Atlas
  // - No internet connection
  // - MongoDB Atlas cluster is paused/unavailable
  //
  // Since the database is unavailable, we do NOT start the
  // Express server.
  // ----------------------------------------------------------
  .catch((err) => {

    // Log the actual error message for debugging.
    console.error(
      "Cannot connect to database:",
      err.message
    );
  });