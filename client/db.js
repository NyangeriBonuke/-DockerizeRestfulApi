const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.mongo_uri)
.then(() => {
    console.log("Connected to mongodb")
})
.catch((error) => {
    console.log(error)
})