const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    name:{
        type : String,
        trim : true,
        required : true,
    },
    description : {
        type : String,
        trim : true,
     
    },
    departments:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Department"
        }
    ],
    Organization:{
        type:mongoose.Types.ObjectId,
        ref:"Organization"
    },
    customAttributes :[
        {
            title :{
                type :String
            },
            value:{
                type :String
            }
    }
],
  
})

module.exports =  mongoose.model("Branch",branchSchema)