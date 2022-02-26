const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
  Description:{
      type:String,
  },
  categoryImage:{
    type:String,
 },
  Status:{
      type:Boolean,
      default:false,
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
  count: {
    type: Number,
    default:0
  },
});

module.exports = new mongoose.model("Category", categorySchema);
