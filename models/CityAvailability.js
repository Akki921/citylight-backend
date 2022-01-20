const mongoose = require("mongoose");

const cityAvailabilitySchema = new mongoose.Schema({
  city: {
    // id:mongoose.Schema.Types.ObjectId, ref:"City",
    type:String
  },
  locality:{
      type:String,
  },
  availability:{
      type:Boolean,
      default:false,
  },
  time:{
type:String,
},
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: String,
    default:"admin"
  },
  modifiedDate: {
    type: Date,
  },
  modifiedBy: {
    type: String,
    default:"admin"
  },
});

module.exports = new mongoose.model("CityAvailability", cityAvailabilitySchema);
