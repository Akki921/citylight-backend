const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  Username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: Number,
  },
  modifiedDate: {
    type: Date,
  },
  modifiedBy: {
    type: Number,
  },
});

module.exports = new mongoose.model("User", userSchema);
