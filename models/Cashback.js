const mongoose = require('mongoose');

const cashbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerProfile', required: true },
    cashbackBalance:{type: Number, default: 0}
})
    

module.exports = mongoose.model('Cashback', cashbackSchema);