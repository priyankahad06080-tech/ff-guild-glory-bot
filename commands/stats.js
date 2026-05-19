module.exports = {
  data: {
    name: 'stats',
    description: 'View member statistics'
  },
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    const stats = `
📊 **${user.username} - Member Stats**

💪 Power Level: ${Math.floor(Math.random() * 100) + 1}/100
⚔️ Battles Won: ${Math.floor(Math.random() * 50) + 1}
🛡️ Battles Lost: ${Math.floor(Math.random() * 20) + 1}
🎯 Achievements: ${Math.floor(Math.random() * 30) + 1}
📈 Guild Contribution: ${Math.floor(Math.random() * 100) + 1}%
    `;
    message.reply(stats);
  },
};