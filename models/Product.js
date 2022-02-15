const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  description: {
    type: String,
  },
  collectio: {
    type: String,
  },
  availableFor: {
    type: String,
  },
  sku: {
    type: String,
  },
  tags: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  stock: {
    type: Boolean,
  },
  price: {
    type: Number,
  },
  sellingprice: {
    type: Number,
  },
  offerprice: {
    type: Number,
  },
  offerfornewcustomer: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  productImage: {
    type: String,
  },
  HSNCODE: {
    type: String,
  },
  CGST: {
    type:Number,
  },
  SGST: {
    type: Number,
  },
  IGST: {
    type: Number,
  },
  city:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  }],
  locality:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CityAvailability",
  }],
  createdDate: {
    type: Date,
  },
});
module.exports = new mongoose.model("Product", productSchema);
