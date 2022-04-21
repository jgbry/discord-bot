const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Donne les ping du bot.'),
    async execute(interaction, client) {
        const embed = new client.discord.MessageEmbed()
            .setColor('5ce1e6')
            .setDescription(`Ping du bot : ${client.ws.ping}ms`)
            .setFooter(client.config.nom, client.user.avatarURL())
            .setTimestamp();
        interaction.reply({
            embeds: [embed]
        });
    },
};
