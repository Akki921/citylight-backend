const mongoose = require("mongoose");

const refferalSchema = new mongoose.Schema({
  refreeDiscount: {
    type: Number,
  },
  newUserDiscount: {
    type: Number,
  },
  createdDate: {
    type: Date,
  },
  referid: {
    type: Number,
  },
  
  createdBy: {
    type: String,
    default:"Admin"
  },
 
});

module.exports = new mongoose.model("Refferal", refferalSchema);
