const Player = require('../models/Player');

class PlayerTracker {
  constructor() {
    this.trackingInterval = null;
  }

  async trackPlayer(playerId, experience) {
    try {
      let player = await Player.findOne({ playerId });
      if (!player) {
        player = new Player({
          playerId,
          experience: 0,
          level: 1,
          contributions: [],
        });
      }
      player.experience += experience;
      player.contributions.push({
        amount: experience,
        timestamp: new Date(),
      });
      await player.save();
      return player;
    } catch (error) {
      console.error('Error tracking player:', error);
      throw error;
    }
  }

  async getLeaderboard(limit = 10) {
    try {
      const leaderboard = await Player.find()
        .sort({ experience: -1 })
        .limit(limit);
      return leaderboard;
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw error;
    }
  }

  async getPlayerStats(playerId) {
    try {
      const player = await Player.findOne({ playerId });
      if (!player) return null;
      return {
        playerId,
        experience: player.experience,
        level: player.level,
        totalContributions: player.contributions.length,
        averageContribution:
          player.experience / (player.contributions.length || 1),
      };
    } catch (error) {
      console.error('Error getting player stats:', error);
      throw error;
    }
  }

  startTracking() {
    this.trackingInterval = setInterval(async () => {
      console.log('👥 Tracking active players');
    }, 300000); // Every 5 minutes
  }

  stopTracking() {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
    }
  }
}

module.exports = PlayerTracker;
