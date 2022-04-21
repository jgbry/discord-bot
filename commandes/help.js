const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Donne les commandes du bot.'),
  async execute(interaction, client) {
    const embed = new client.discord.MessageEmbed()
      .setColor('5ce1e6')
      .setAuthor({ name: `Commandes du bot ${client.config.nom}`, iconURL: client.user.avatarURL() })
      .addField('<:mod:966355972165619722> Modérations (2)', '`ban {@users} {Raison}` | `kick {@users} {Raison}`')
      .addField('<:info:966356207625437244> Informations (3)', '`botinfo` | `help` | `ping`')
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });
  },
};
