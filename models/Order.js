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
    type: String,
  },
  startDate: {
    type: String,
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
    type: String,
   
  },
  qtyperday: {
    type: Number,
  },
  frequency: {
    type: String,
  },
  endDate: {
    type: String,
  },
});

module.exports = new mongoose.model("Order", orderSchema);
