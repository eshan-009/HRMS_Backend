const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
   title:{
    type:String
   }
})

module.exports = mongoose.model("Skill",skillSchema)