const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
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

  productImage: {
    type: String,
  },

  thumbnail: {
    type: String,
  },
});
module.exports = new mongoose.model("Product", productSchema);
