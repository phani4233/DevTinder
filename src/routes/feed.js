const express = require('express')
const { adminAuth } = require('../middlewares/auth')
const { getFullFeed } = require('../controllers/feedController')
const feedRouter = express.Router()

feedRouter.use(adminAuth)

feedRouter.get("/feed",getFullFeed)

module.exports = {feedRouter}


