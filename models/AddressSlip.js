const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    Address: {
    type: String,
  },
  slipNo: {
    type: String,
  },
  subNo: {
    type: String,
  },
  productName: {
    type: String,
  },
  customerName: {
    type: String,
  },
  productQty: {
    type: Number,
  },
  orderNo: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
  },
});

module.exports = new mongoose.model("AddressSlip", AddressSchema);
