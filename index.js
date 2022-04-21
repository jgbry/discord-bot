const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});
const Discord = require('discord.js');

client.discord = Discord;   
client.config = config;

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commandes').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commandes/${file}`);
    client.commands.set(command.data.name, command);
};

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client, config);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            content: "Une erreur s'est produite lors de l'utilisation de cette commande !",
            ephemeral: true
        });
    };
});
client.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.cache;
  
    let embed = new Discord.MessageEmbed()
    .setThumbnail(client.config.logo)
    .addField(`:point_right: Bienvenue !`,`Salut, bienvenue à <@${member.user.id}>!`, true)
    .addField(`:zap: Notre Serveur`, `Nombre de membres : ${member.guild.memberCount}`, true)
    .setColor("GREEN")
    channel.find((channel) => channel.id === client.config.welcome_channel).send({ embeds: [embed] });
});
client.login(require('./config.json').token);