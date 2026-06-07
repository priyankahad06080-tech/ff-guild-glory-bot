const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  glory: {
    type: Number,
    default: 0,
  },
  members: [
    {
      playerId: String,
      role: String,
      joinedAt: Date,
    },
  ],
  dailyQuests: [
    {
      questId: String,
      completed: Boolean,
      reward: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Guild', guildSchema);
