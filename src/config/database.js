const mongoose = require("mongoose")
require("dotenv").config()

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Database Connected Successfully"))
    .catch(()=>console.log("Error Connecting to Database"))
}

module.exports = dbConnect;