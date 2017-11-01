const Discord = require('discord.js');
const moment = require('moment');
const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let auteur = message.author.discriminator + '#' + message.author.id;

    moment.locale('fr');

    if (client.globalLastDaily.get(auteur) != moment().format('L')) {
        client.globalLastDaily.set(auteur, moment().format('L'));
        client.grice.set(auteur, parseInt(client.grice.get(auteur)) + parseInt(config.rice.globalDailyMoney));
        embed.setDescription(`Vous avez désormais **${client.grice.get(auteur)}** :rice_cracker:`);
        embed.setFooter(`${config.rice.globalDailyMoney} boules de riz ont été ajoutés à votre compte !`);
        embed.setColor(0x45f442);
        message.channel.send(embed);
    } else {
        embed.setDescription(`Tu à déja récupéré ta récompense globale aujourd'hui !`);
        embed.setFooter(`Prochaine ` + moment().endOf('day').fromNow());
        embed.setColor(0xf44141);
        message.channel.send(embed);
        return;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['gdailymoney', 'gdailyriz', 'gdailyrice'],
    permLevel: 0
};

exports.help = {
    name: 'gdaily',
    description: 'Collecter ses boulettes de riz globales quotidiennes',
    usage: 'gdaily'
};