const mongoose = require("mongoose");

const customerCollectionSchema = mongoose.Schema({
 
  collectionName: {
    type: String,
    required: true,
    trim: true,
  },
  selectCustomer:[ 
      {
          id:mongoose.Schema.Types.ObjectId, ref:"User",
      },
  ],
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: String,
    default:"admin",
  },
 
});
module.exports = new mongoose.model("CustomerCollection", customerCollectionSchema);

