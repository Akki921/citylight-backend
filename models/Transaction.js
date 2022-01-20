const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true },
    debit:{type: Number, default: 0},
    credit:{type: Number, default: 0},
    availableBalance:{type: Number, default: 0}
    
}, { timestamps: true });


module.exports = mongoose.model('Transaction', transactionSchema);