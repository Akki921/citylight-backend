const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  startDate: {
    type: Array,
  },
  orderValue: {
    type: Number,
  },
  coupan: {
    type: String,
  },
  orderStatus: {
    type: String,
    default: "new",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  qtyperday: {
    type: Number,
  },
  frequency: {
    type: String,
  },

});

module.exports = new mongoose.model("Order", orderSchema);
