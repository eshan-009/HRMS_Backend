const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
   title:{
    type:String
   }
})

module.exports = mongoose.model("Designation",designationSchema)