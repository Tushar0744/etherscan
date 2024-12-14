const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  balance: { type: String },
  transactions: [{ type: mongoose.Schema.Types.Mixed }],
});

module.exports = mongoose.model('Account', accountSchema);
