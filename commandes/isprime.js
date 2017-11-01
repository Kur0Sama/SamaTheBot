const Discord = require('discord.js');
const moment = require('moment');

function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    moment.locale('fr');

    if (!args[0]) {
        embed.setDescription(`Erreur: Il faut entrer un nombre !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (isNaN(args[0])) {
        embed.setDescription(`Erreur: **${args[0]}** n'est pas un nombre !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (isPrime(args[0])) {
        embed.setDescription(`**${args[0]}** est un chiffre premier !`);
        embed.setColor(0x45f442);
        embed.setFooter(moment().format('LLLL'));
        message.channel.send(embed);
    } else {
        embed.setDescription(`**${args[0]}** n'est pas un chiffre premier !`);
        embed.setColor(0x45f442);
        embed.setFooter(moment().format('LLLL'));
        message.channel.send(embed);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ispremier', 'isp', 'prime?'],
    permLevel: 0
};

exports.help = {
    name: 'isprime',
    description: 'Savoir si un nombre est un nombre premier',
    usage: 'isprime <nombre>'
};