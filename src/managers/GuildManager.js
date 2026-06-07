const Guild = require('../models/Guild');
const axios = require('axios');

class GuildManager {
  constructor() {
    this.apiKey = process.env.FREEFIRE_API_KEY;
    this.guildId = process.env.GUILD_ID;
    this.autoLevelInterval = null;
  }

  async getGuildStatus() {
    try {
      const guild = await Guild.findOne({ guildId: this.guildId });
      if (!guild) {
        return this.initializeGuild();
      }
      return guild;
    } catch (error) {
      console.error('Error getting guild status:', error);
      throw error;
    }
  }

  async initializeGuild() {
    const newGuild = new Guild({
      guildId: this.guildId,
      level: 1,
      experience: 0,
      members: [],
      glory: 0,
      createdAt: new Date(),
    });
    return await newGuild.save();
  }

  async levelUpGuild() {
    try {
      const guild = await Guild.findOne({ guildId: this.guildId });
      if (!guild) return { error: 'Guild not found' };

      const experienceNeeded = guild.level * 1000;
      if (guild.experience >= experienceNeeded) {
        guild.level += 1;
        guild.experience = 0;
        guild.glory += 500 * guild.level;
        await guild.save();
        return {
          success: true,
          newLevel: guild.level,
          glory: guild.glory,
          message: `🎉 Guild leveled up to level ${guild.level}!`,
        };
      }
      return {
        success: false,
        message: `Need ${experienceNeeded - guild.experience} more experience`,
      };
    } catch (error) {
      console.error('Error leveling up guild:', error);
      throw error;
    }
  }

  async addExperience(amount) {
    try {
      const guild = await Guild.findOne({ guildId: this.guildId });
      if (!guild) return;

      guild.experience += amount;
      await guild.save();
      return guild;
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  }

  startAutoLevelUp() {
    this.autoLevelInterval = setInterval(async () => {
      await this.addExperience(100);
      console.log('📊 Guild experience updated');
    }, 60000); // Update every minute
  }

  stopAutoLevelUp() {
    if (this.autoLevelInterval) {
      clearInterval(this.autoLevelInterval);
    }
  }
}

module.exports = GuildManager;
