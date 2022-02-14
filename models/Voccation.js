const mongoose = require("mongoose");

const VoccationSchema = new mongoose.Schema({
  ProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerProfile",
    required: true,
  },
  StartDate: { type: Date, required: true },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  locality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CityAvailability",
  },
 EndDate: { type: Date, required: true },
  cutOffTime: {
    type: String,
  },
});

module.exports = mongoose.model("Voccation", VoccationSchema);
