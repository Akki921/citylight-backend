const mongoose = require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);
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
  index: {
    type: Number,
  }
});
categorySchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'index'});
module.exports = new mongoose.model("Category", categorySchema);
