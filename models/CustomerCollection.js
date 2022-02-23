const mongoose = require("mongoose");

const customerCollectionSchema = mongoose.Schema({
  collectionName: {
    type: String,
    required: true,
    trim: true,
  },
  selectCustomer: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerProfile",
      },
    },
  ],
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: String,
    default: "admin",
  },
});
module.exports = new mongoose.model(
  "CustomerCollection",
  customerCollectionSchema
);
