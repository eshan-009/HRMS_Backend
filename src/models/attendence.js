const mongoose = require("mongoose")

const attendenceSchema = new mongoose.Schema({
    timing : {
        hours : {
            type : Number,
            trim : true
          },
         minutes : {
            type : Number,
            trim : true
          }
      },
    locations : [
        
           {
            name : {
                type : String,
                trim : true,
                required : true
            },
            latitude : {
                type : mongoose.Schema.Types.Decimal128,
                trim : true
            },
            longitude :{
                type : mongoose.Schema.Types.Decimal128,
                trim : true
            }
           }
          
        
    ]

})

module.exports = mongoose.model("Attributes",attendenceSchema)