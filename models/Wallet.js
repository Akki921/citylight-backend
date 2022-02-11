const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerProfile', required: true },
    FirstName:{type:String},
    Mobile:{type:Number},
    availableBalance:{type: Number, default: 0}
})
    



module.exports = mongoose.model('Wallet', walletSchema);