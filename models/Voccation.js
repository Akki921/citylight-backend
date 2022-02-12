const mongoose = require("mongoose");

const VoccationSchema = new mongoose.Schema({
  ProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerProfile",
    required: true,
  },
  StartDate: { type: Date, required: true },
  EndDate: { type: Date },
});

module.exports = mongoose.model("Voccation", VoccationSchema);
