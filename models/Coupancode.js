const mongoose = require("mongoose");
const coupanSchema = mongoose.Schema({
  coupanCode: { type: String, min: 5, max: 15, require: true, unique: true },

  applyProduct: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  productCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCollection",
  },
  applyCustomer: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  customerCollections: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerCollections",
      },
    },
  ],
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
  },
  minValue: {
    type: Number,
  },
  totalCoupanLimit: {
    type: Number,
  },
  percustomerLimit: {
    type: Boolean,
  },
  isRunning: {
    type: Boolean,
    default: true,
  },
  coupanCount:{
    type: Number,
    default: 0, 
  },
  flagged:{
    type: Boolean,
    default: false, 
  }
});
module.exports = new mongoose.model("Coupancode", coupanSchema);
