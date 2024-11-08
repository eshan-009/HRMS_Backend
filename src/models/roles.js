const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
   title:{
    type:String
   },
   accessList:[
      {
          type:String
      }
   ],
   selectedCategories:[
      {
          type:String
      }
   ],

 
})

module.exports = mongoose.model("Role",roleSchema)