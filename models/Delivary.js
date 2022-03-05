const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  DelivaryNo: {
    type: Number,
  },
  subNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerProfile",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  isDelivared: {
    type: Boolean,
    default: false,
  },
  isSelcted: {
    type: Boolean,
    default: false,
  },
  todayDate: {
    type: Date,
    default:Date.now()
  },  
});

module.exports = new mongoose.model("Delivary", deliverySchema);
