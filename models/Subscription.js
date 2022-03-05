const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  subNo: {
    type: String,
    required: true,
  },
  OnceUpdate: [{ Start: Date, qtyoftheday: Number }],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerProfile",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  delivaryBoy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default:'61e548d7fcaece036ac44144'
  },
  startDate: { type: Date },
  productValue: {
    type: Number,
  },
  isAssign: {
    type: Boolean,
    default: false,
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
  customDates: [{ Start: Date, qtyoftheday: Number, id: Number}],
  QtyperDay: {
    type: Number,
  },
  QtytobeDelivered: {
    type: Number,
    default:0
  },
  QtyDelivered: {
    type: Number,
    default:0
  },
  Qtyfullfilled: {
    type: Number,
    default:0
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
