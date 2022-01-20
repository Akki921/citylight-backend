const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  PermissionName: {
    type: String,
  },
  path: {
    type: String,
  },
  status:{
    type:Boolean,
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
    type: Date,
  },
});

module.exports = new mongoose.model("Permission", permissionSchema);
