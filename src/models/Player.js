const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    unique: true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  contributions: [
    {
      amount: Number,
      timestamp: Date,
      type: String,
    },
  ],
  rewards: {
    glory: { type: Number, default: 0 },
    badges: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Player', playerSchema);
