const mongoose = require("mongoose");

const CustomerProfileSchema = new mongoose.Schema({
 
  login: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerLogin",
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  houseno: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  locality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CityAvailability",
  },
  ringtheBell: {
    type: Boolean,
    default:true,
  },
  slottime: {
    type: String,
  },
  slottime: {
    type: String,
  },
});

module.exports = new mongoose.model("CustomerProfile", CustomerProfileSchema);
