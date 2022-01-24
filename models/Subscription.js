const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    subNo: {
        type: String,
        required: true,
      },
     subDate: {
        type: String,
      },
      startFrom: {
        type: String,
      },
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      QtyperDay: {
        type: Number,
      },
      frequency :{
        type:String,
    },
    endDate:{
      type:String,
  },
  iscancle:{
    type:Boolean,
    default:false
  },
  // nosubscriptionFrom:{
  //   type:String,
  // },
  // nosubscriptionTo:{
  //   type:String,
  // },
});

module.exports = new mongoose.model("Subscription", subscriptionSchema);
