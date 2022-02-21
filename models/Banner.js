const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: String,
    default: "admin",
  },
});

module.exports = new mongoose.model("Banner", BannerSchema);