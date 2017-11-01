const Discord = require('discord.js');
const moment = require('moment');
const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    embed.setDescription(`Pour m'inviter sur votre serveur, utilisez ce lien :\n${config.bot.invitelink}`);
    embed.setColor(0x45f442);
    embed.setFooter(moment().format('LLLL'))
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['invit', 'link'],
    permLevel: 0
};

exports.help = {
    name: 'invite',
    description: 'Voir le lien d\'invitation du bot',
    usage: 'invite'
};