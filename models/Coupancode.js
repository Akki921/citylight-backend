const mongoose = require("mongoose");
const coupanSchema = mongoose.Schema({
    coupanCode: 
        { type: String, 
            min: 5,
            max: 15,
            require: true, 
            unique: true 
    },
    
    applyProduct : {
        type: mongoose.Schema.Types.ObjectId, ref: "Product" 

    },
    productCollection : { 
        type: mongoose.Schema.Types.ObjectId, ref: "ProductCollection" 
    },
    applyCustomer : {
        type: mongoose.Schema.Types.ObjectId, ref: "User"  
    },
    customerCollections : {
        type: mongoose.Schema.Types.ObjectId, ref: "CustomerCollections"  
    },
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    },
    discount : {
        type : Number
    },
    description : {
        type : String
    }
});
module.exports = new mongoose.model("Coupancode", coupanSchema);