const mongoose = require("mongoose");

const productCollectionSchema = mongoose.Schema({
 
  collectionName: {
    type: String,
    required: true,
    trim: true,
  },
  selectProduct:[
      {
          id:mongoose.Schema.Types.ObjectId, ref:"Product",
      },
  ]
 
});
module.exports = new mongoose.model("ProductCollection", productCollectionSchema);
