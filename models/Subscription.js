const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    subNo: {
        type: String,
        required: true,
      },
     subDate: {
        type: String,
      },
      startFrom: [{Start:Date, qtyperday:Number}], 
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      QtyperDay: {
        type: Number,
      },
      frequency :{
        type:String,
    },
  iscancle:{
    type:Boolean,
    default:false
  },
 isSelected :{
    type:Boolean,
    default:false
  },
});

module.exports = new mongoose.model("Subscription", subscriptionSchema);
