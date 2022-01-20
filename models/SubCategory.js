const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  SubCategoryName: {
    type: String,
  },
  CategoryName: {
    type: Schema.Types.ObjectId, ref: "Category" 
  },

  Description:{
      type:String,
  },
  Status:{
      type:Boolean,
      default:false,
  },
Thumbnail: [
        {
          img: { type: String },
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
    default:"admin"
  },
  modifiedDate: {
    type: Date,
  },
  modifiedBy: {
    type: String,
    default:"admin"
  },
});

module.exports = new mongoose.model("SubCategory", subCategorySchema);
