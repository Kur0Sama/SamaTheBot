const Discord = require('discord.js');
const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    message.channel.sendCode('asciidoc', `= Informations sur moi =\n\nIls me font confiance :: ${client.guilds.size} serveurs\nIls m'utilisent :: ${client.users.size} personnes\nJe suis la :: 99.99% du temps\nMon préfixe est :: ${config.bot.prefix}<commande>`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['samabot', 'bot', 'client'],
    permLevel: 0
};

exports.help = {
    name: 'info',
    description: 'Voir les informations du bot',
    usage: 'info'
};