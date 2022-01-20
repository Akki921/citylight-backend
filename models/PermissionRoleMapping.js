const mongoose = require("mongoose");

const permissionRoleMappingSchema = new mongoose.Schema({
  RoleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  PermissionData:[{
    PermissionId: { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
  }],
  
  status:{
    type:Boolean
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

module.exports = new mongoose.model(
  "PermissionRoleMapping",
  permissionRoleMappingSchema
);
