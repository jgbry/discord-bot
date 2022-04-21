const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Exclure une personne.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Utilisateur à exclure')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du kick')
        .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({
      content: 'Vous n\'avez pas la permission requise pour éxecuter cette commande ! (`KICK_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'La personne que vous souhaitez exclure  possède un rôle supérieur au vôtre !',
      ephemeral: true
    });

    if (!user.kickable) return interaction.reply({
      content: "La personne que vous souhaitez exclure est au dessus de moi ! Je ne peut pas l'exclure.",
      ephemeral: true
    });

    if (interaction.options.getString('raison')) {
      user.kick(interaction.options.getString('raison'))
      interaction.reply({
        content: `**${user.user.tag}** A été exclus avec succès !`
      });
    } else {
      user.kick()
      interaction.reply({
        content: `**${user.user.tag}** A été exclus avec succès !`
      });
    };
  },
};
