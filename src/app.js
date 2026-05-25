// Import the Express library
// Express is a lightweight framework used to build web servers in Node.js
const express = require("express");
const {connectDB} =require("./config/database")
const {adminAuth,userAuth} = require("./middlewares/auth")

// Create an Express application instance
// 'app' is the main object used to define routes and middleware
const app = express();

app.get("/user",userAuth,(req,res) => {
    console.log("userDetails---",req.query)
    res.send({name:"phani",age:"25"})

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


// Start the server on port 3000
// The server will listen for incoming requests at http://localhost:3000
await connectDB()
app.listen(3000, () => {

    // This callback runs once the server starts successfully
    console.log("server is successfully running");
});