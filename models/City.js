const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: String,
    default:"admin"
  },
  modifiedDate: {
    type: Date,
  },
  modifiedBy: {
    type: String,
    default:"admin"
  },
});

module.exports = new mongoose.model("City", citySchema);
