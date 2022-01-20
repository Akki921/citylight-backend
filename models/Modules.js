const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleName: {
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
    default:"Admin"
  },
  modifiedDate: {
    type: Date,
  },
  modifiedBy: {
    type: Date,
  },
});

module.exports = new mongoose.model("Module", moduleSchema);
