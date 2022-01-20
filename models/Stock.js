const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
     sku: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      deliveryToday: {
        type: Number,
      },
      deliveryTomorrow : {
        type: Number,
      },
      city: {
        type: String,
      },
    
      productType: {
        type: String,
      },
      tags: {
        type: String,
      },
      createdDate: {
        type: Date,
      },
});

module.exports = new mongoose.model("Stock", stockSchema);
