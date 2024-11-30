const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
   firstName:{
    type:String,
    required : true,
   },
   lastName:{
    type:String,
    required : true,
   },
   age:{
    type:Number
   },
   gender:{
    type:String
   },
   profilePicture:{
    type:String
   },
   employeeCode: {
    type:String,
    trim:true,
    required : true,
  },

  department:{
    type:mongoose.Types.ObjectId,
    ref:"Department",
   
  },
  aadharNumber: {
    type:String,
    trim:true
  },
  dateOfBirth: {
    type:String,
    format : Date,
    trim:true
  },
  customAttributes :[
    {
      title : {
          type : String
      },
      value :{
        type : String
      }
    }
  ],
  skills: [
    {
     type : String
    },
  ],
  designation: [
    {type : String}
  ],
})

module.exports = mongoose.model("Profile",profileSchema)