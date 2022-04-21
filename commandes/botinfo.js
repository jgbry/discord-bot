const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Donne les informations du bot.'),
  async execute(interaction, client) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setURL('https://github.com/Nigary')
          .setEmoji("966333950681284709")
          .setLabel('Github')
          .setStyle('LINK'),

        new MessageButton()
          .setURL('https://twitter.com/Iamnigary')
          .setEmoji("966333792514097152")
          .setLabel('Twitter')
          .setStyle('LINK'),

        new MessageButton()
          .setURL('https://twitch.tv/nigaryttv')
          .setEmoji("966333679980920852")
          .setLabel('Twitch')
          .setStyle('LINK'),

        new MessageButton()
          .setURL('https://motak.fr')
          .setEmoji("966333994654371870")
          .setLabel('Motak Heberg')
          .setStyle('LINK'),

        new MessageButton()
          .setURL('https://discord.gg/sqfeMBc')
          .setEmoji("901207777765130300")
          .setLabel('Discord')
          .setStyle('LINK'),

      );
    const embed = new client.discord.MessageEmbed()
      .setColor('5ce1e6')
      .setDescription('Développé par Nigary#0001 avec :heart:')
      .setFooter(client.config.nom, client.user.avatarURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [embed], components: [row]
    });
  },
};
