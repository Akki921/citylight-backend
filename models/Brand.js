const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema({
  BrandName: {
    type: String,
    unique:true
  },
  Manufacture:{
      type:String,
  },
  noofProduct:{
    type:String,
  },
  comment:{
    type:String,
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
    type: Date,
  },
});

module.exports = new mongoose.model("Brand", BrandSchema);
