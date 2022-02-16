const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  subNo: {
    type: String,
    required: true,
  },
  // OnceUpdate: [{ Start: Date, qtyoftheday: Number }],

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerProfile",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  startDate: { type: Date },
  productValue: {
    type: Number,
  },
  frequency: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  locality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CityAvailability",
  },
  customDates: [{ Start: Date }],
  QtyperDay: {
    type: Number,
  },
  iscancle: {
    type: Boolean,
    default: false,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("Subscription", subscriptionSchema);
