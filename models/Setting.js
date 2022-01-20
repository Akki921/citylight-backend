const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  Value:{
      type:String,
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

module.exports = new mongoose.model("setting", settingSchema);
