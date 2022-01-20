const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    FirstName:{type:String},
    email:{type:String},
    availableBalance:{type: Number, default: 0}
})
    



module.exports = mongoose.model('Wallet', walletSchema);