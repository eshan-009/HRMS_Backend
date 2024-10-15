const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name:{
        type : String,
        trim : true,
        required : true,
    },
    description : {
        type : String,
        trim : true,
        required : true,
    },
    manager:{
          type:mongoose.Types.ObjectId,
            ref:"User"
    },
    employees:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    branch:{
         type:mongoose.Types.ObjectId,
        ref:"Branch"
    },
    Organization:{
        type:mongoose.Types.ObjectId,
        ref:"Organization"
    },
    customAttributes :[
        {
            title:{
                type:String
            },
            value :{
                type:String
            }
        }
    ],
  
})

module.exports =  mongoose.model("Department",departmentSchema)