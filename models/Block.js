const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
  number: { 
    type: String, 
    required: true, 
    unique: true, // This ensures the block number is unique
  },
  hash: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: String, 
    required: true,  // Store timestamp as a string to handle BigInt
  },
  transactions: { 
    type: [String], 
    required: true,  // Assuming transactions are array of strings (tx hashes)
  },
});

// Adding a unique index to the "number" field
BlockSchema.index({ number: 1 }, { unique: true });

module.exports = mongoose.model('Block', BlockSchema);
