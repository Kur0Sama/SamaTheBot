const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    if (!args[0]) {
        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        message.channel.sendCode('asciidoc', `= Liste des commandes [${config.bot.prefix}help <commande> pour plus d'infos] =\n\n${client.commands.map(c => `${config.bot.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
    } else {
        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            message.channel.sendCode('asciidoc', `= ${command.help.name} = \n\nDescription :: ${command.help.description}\nUtilisation :: ${command.help.usage}`);
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h', 'cmd'],
    permLevel: 0
};

exports.help = {
    name: 'help',
    description: 'Voir toutes les commandes disponnibles a votre grade.',
    usage: 'help [commande]'
};