const mongoose = require("mongoose");

const CustomerLoginSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  phoneotp: {
    type: Number,
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

module.exports = new mongoose.model("CustomerLogin", CustomerLoginSchema);
