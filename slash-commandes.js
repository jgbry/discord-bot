const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commandes').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commandes/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(require('./config.json').token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Commandes d'application enregistrées avec succès."))
    .catch(console.error);
