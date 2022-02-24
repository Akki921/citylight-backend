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
  refercode: {
    type: Number,
  },
  refercount: {
    type: Number,
  },
  referlink: {
    type: String,
    default:'not yet',
  },
  refercashback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Refferal",
   // default:"62131c36a4315fb6de3e6fc6"
  },
  coupanCode: [ {
    coupanid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupancode",
    },
  },]
});

module.exports = new mongoose.model("CustomerProfile", CustomerProfileSchema);
