const adminAuth = (req,res,next) => {

  console.log("checking if user is authenticated or not")

  let token = "xyz"
  let userIsAuthenticated = token === "xyz"
  if(userIsAuthenticated){
    next()
  }else{
    res.status(401).send("user not authenticated")
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