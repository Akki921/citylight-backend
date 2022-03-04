const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
  },
  moduleData: [
    {
      moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    },
  ],

  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: String,
    default: "Admin",
  },
  modifiedDate: {
    type: Date,
  },
  modifiedBy: {
    type: Date,
  },
});

module.exports = new mongoose.model("Role", roleSchema);
