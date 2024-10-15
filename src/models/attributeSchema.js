const mongoose = require("mongoose")

const attributeSchema = new mongoose.Schema({
    parent : {
        type : String,
       trim : true
    },
    attributeList : [
        
           {
            title : {
                type : String,
                trim : true
            },
           }
          
        
    ]

})

module.exports = mongoose.model("Attributes",attributeSchema)