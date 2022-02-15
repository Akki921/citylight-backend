const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
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
  QtyDeliverd: {
    type: Number,
  },
   QtyFullfilled: {
    type: Number,
   default:0,
  },
  QtyNotFullfilled: {
    type: Number,
   default: 0,
  },
  Status: {
    type: String,
    default: 'pending',
  },
  todayDate: {
    type: Date,
  },

});

module.exports = new mongoose.model("Delivary", deliverySchema);
