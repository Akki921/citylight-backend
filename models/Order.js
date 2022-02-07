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
    ref: "CustomerProfile",
  },
  startDate: [{Start:Date, qtyperday:Number}],
  orderValue: {
    type: Number,
  },
  coupan: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  frequency: {
    type: String,
  },
  address: {
    type: String,
  },
  locality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CityAvailability",
  },
});

module.exports = new mongoose.model("Order", orderSchema);
