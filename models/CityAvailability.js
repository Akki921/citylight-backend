const mongoose = require("mongoose");

const cityAvailabilitySchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  locality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CityAvailability", 
  },
  availability: {
    type: Boolean,
  },
  morning: {
    type: Boolean,
  },
  evening: {
    type: Boolean, 
  },
  morningtime: {
    type: String,
  },
  eveningtime: {
    type: String,
  },
  modifiedBy: {
    type: String,
    default: "admin",
  },
});

module.exports = new mongoose.model("CityAvailability", cityAvailabilitySchema);
