const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  organization:{
    type:mongoose.Types.ObjectId,
    ref:"Organization"
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref: "Role",
  },
 

  leaveBalances: {
    type: Number,
  },
  leaveRequests: {
    type: Number,
  },

  performance: {
    type: String,
    enum: ["Poor", "Average", "Good", "Excellent", "Exceptional"],
  },
  personalDetails: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
  },
  additionalDetails : {
    type: mongoose.Types.ObjectId,
    ref: "AdditionalDetails",
  }
});

module.exports = mongoose.model("User", userSchema);
