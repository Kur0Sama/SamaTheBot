const Discord = require('discord.js');
const moment = require('moment');
const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let auteur = message.guild.id + message.author.id;

    moment.locale('fr');

    if (client.lastDaily.get(auteur) != moment().format('L')) {
        client.lastDaily.set(auteur, moment().format('L'));
        client.rice.set(auteur, parseInt(client.rice.get(auteur)) + parseInt(config.rice.dailyMoney));
        embed.setDescription(`Vous avez désormais **${client.rice.get(auteur)}** :rice_cracker:`);
        embed.setFooter(`${config.rice.dailyMoney} boules de riz ont été ajoutés à votre compte !`);
        embed.setColor(0x45f442);
        message.channel.send(embed);
    } else {
        embed.setDescription(`Tu à déja récupéré ta récompense aujourd'hui !`);
        embed.setFooter(`Prochaine ` + moment().endOf('day').fromNow());
        embed.setColor(0xf44141);
        message.channel.send(embed);
        return;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['dailymoney', 'dailyriz', 'dailyrice'],
    permLevel: 0
};

exports.help = {
    name: 'daily',
    description: 'Collecter ses boulettes de riz quotidiennes',
    usage: 'daily'
};