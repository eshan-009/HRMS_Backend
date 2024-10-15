const mongoose = require("mongoose");
const department = require("./department");

const organizationSchema = new mongoose.Schema({
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
    logo :{
        type : String,
        trim : true, 
    },
    branches:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Branch"
        }
    ],
    departments:[
        {
            
                type:mongoose.Types.ObjectId,
                ref:"Department"
            
        }
    ],
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

module.exports =  mongoose.model("Organization",organizationSchema)