const mongoose = require("mongoose");

const accessListSchema = new mongoose.Schema({

 accessList:[
    {
        type:String
    }
 ]
});

module.exports = mongoose.model("AccessList", accessListSchema);
