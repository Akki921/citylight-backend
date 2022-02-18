const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  complainNo: {
    type: String,
    required: true,
  },
  complain: {
    type: String,
    required: true,
  },
  complainCategory: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerProfile",
  },
  note: {
    type: String,
  },
  complainDate: {
    type: Date
  },
  Resolution: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },

});

module.exports = new mongoose.model("Support", supportSchema);
