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
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
 
});

module.exports = new mongoose.model("CustomerProfile", CustomerProfileSchema);
