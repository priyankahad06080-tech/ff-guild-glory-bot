const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('glory')
    .setDescription('Manage guild glory points')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add glory points to a member')
        .addUserOption(option =>
          option.setName('member').setDescription('The member to add glory to').setRequired(true)
        )
        .addIntegerOption(option =>
          option.setName('points').setDescription('Amount of glory points').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('view')
        .setDescription('View a member\'s glory points')
        .addUserOption(option =>
          option.setName('member').setDescription('The member to check').setRequired(true)
        )
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const member = interaction.options.getUser('member');

    if (subcommand === 'add') {
      const points = interaction.options.getInteger('points');
      await interaction.reply(`Added ${points} glory points to ${member.username}!`);
    } else if (subcommand === 'view') {
      await interaction.reply(`${member.username} has 0 glory points.`);
    }
  }
};
