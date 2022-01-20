const mongoose = require("mongoose");
Schema = mongoose.Schema;

const userRoleMappingSchema = new mongoose.Schema({
  roleId: { type: Schema.Types.ObjectId, ref: "Role" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: String,
    default:'admin'
  },
  modifiedDate: {
    type: Date,
  },
  modifiedBy: {
    type: Date,
  },
});

module.exports = new mongoose.model("UserRoleMapping", userRoleMappingSchema);
