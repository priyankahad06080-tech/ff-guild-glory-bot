require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const GuildManager = require('./managers/GuildManager');
const PlayerTracker = require('./managers/PlayerTracker');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/ff-guild-bot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Initialize Managers
const guildManager = new GuildManager();
const playerTracker = new PlayerTracker();

// Routes
app.get('/guild/status', async (req, res) => {
  const status = await guildManager.getGuildStatus();
  res.json(status);
});

app.post('/guild/levelup', async (req, res) => {
  const result = await guildManager.levelUpGuild();
  res.json(result);
});

app.get('/players/leaderboard', async (req, res) => {
  const leaderboard = await playerTracker.getLeaderboard();
  res.json(leaderboard);
});

app.post('/players/track', async (req, res) => {
  const { playerId, experience } = req.body;
  const result = await playerTracker.trackPlayer(playerId, experience);
  res.json(result);
});

// Start bot
app.listen(PORT, () => {
  console.log(`🎮 FF Guild Glory Bot running on port ${PORT}`);
  guildManager.startAutoLevelUp();
  playerTracker.startTracking();
});

module.exports = app;
