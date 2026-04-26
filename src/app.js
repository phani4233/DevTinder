// Import the Express library
// Express is a lightweight framework used to build web servers in Node.js
const express = require("express");

// Create an Express application instance
// 'app' is the main object used to define routes and middleware
const app = express();


// Route-specific middleware for "/test"
// This will only run when the request URL starts with "/test"
app.use("/test", (req, res) => {

    // Sends a response when user visits http://localhost:3000/test
    res.send("ur in a test pathsdvdfv");
});


// Default middleware for "/"
// This acts as a fallback handler for all other routes
// IMPORTANT: "/" matches ALL routes that are not already handled above
app.use("/", (req, res) => {

    // 'req' → contains request details (URL, headers, params, etc.)
    // 'res' → used to send a response back to the client

    // If no earlier route matches, this response will be sent
    res.send("Hello World Welcome to DevTinder");
});


// Start the server on port 3000
// The server will listen for incoming requests at http://localhost:3000
app.listen(3000, () => {

    // This callback runs once the server starts successfully
    console.log("server is successfully running");
});