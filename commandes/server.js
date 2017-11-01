const Discord = require('discord.js');
const moment = require('moment');
const config = require('../storage/config.json');
moment.locale('fr');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let auteur = message.guild.id + message.author.id;

    let guildMoney = 0;
    let guildUsers = 0;
    let guildRichest = '';
    let guildRichest$ = 0;

    let iMoney = [];

    client.rice.array().forEach(function (i) {
        iMoney.push(i);
        guildMoney += parseInt(i);
        guildUsers += 1;
        if (i > guildRichest$) {
            guildRichest$ = i;
        }
    });

    let i = -1;

    client.rice.keyArray().forEach(function (i2) {
        i++;
        if (client.rice.get(i2) == guildRichest$) {
            let i3 = i2.slice(message.guild.id.length);
            guildRichest = message.guild.member(i3).user.username;
            console.log('-------------------------------------------');
            console.log('# LE PLUS RICHE DE : ' + message.guild.id);
            console.log('# L\'ID ' + i3 + ' AVEC ' + iMoney[i]);
            console.log('# VALEUR TABLEAU : ' + i);
            console.log('-------------------------------------------');
        }
    });

    embed.setDescription(`Nombre de comptes : **${guildUsers}**\nRiz total du serveur : **${guildMoney}** :rice_cracker:\nLe plus riche : **${guildRichest}** avec **${guildRichest$}** :rice_cracker:`);
    embed.setFooter(moment().format('LLLL'));
    embed.setColor(0x45f442);
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['guild', 'guilde', 'rich', 'richest'],
    permLevel: 0
};

exports.help = {
    name: 'server',
    description: 'Voir les informations en money du serveur',
    usage: 'server'
};