const mongoose = require("mongoose")

const asideTabSchema = new mongoose.Schema({
    label :{
        type:String,
        trim : true
    },
    children :[
        {
           
            label : {
                type:String,
                trim :true
            },
            url:{
                type:String,
                trim :true
            }
        }
    ]
})

module.exports= mongoose.model("AsideTab",asideTabSchema)