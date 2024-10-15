const mongoose = require("mongoose");

const additionalDeatilsSchema = new mongoose.Schema({
  emergencyContact :{
    contact:{
        type:Number
       },
       relationShip:{
        type:String,
       },
  },

  addressDetails :{
    addressType:{
        type:String,
        enum : ["Temporary","Permanent"]
    },
    propertyNumber :{
        type : String,

    },
    city :{
        type:String,
    },
    zipCode : {
        type : Number
    },
    state : {
        type : String
    },
    country : {
        type : String
    }
  },
bankDetails : {
bankName :{
    type :String
},
accountNumber :{
    type : Number
},
ifscCode :{
    type :String
},
bankBranch :{
    type:String
}
}
})

module.exports = mongoose.model("AdditionalDetails",additionalDeatilsSchema)