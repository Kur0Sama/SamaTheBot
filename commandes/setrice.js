const Discord = require('discord.js');
const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();

    if (message.mentions.users.size < 1) {
        embed.setDescription(`Erreur: Il faut mentionner au moins une personne !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (!args[1]) {
        embed.setDescription(`Erreur: Il faut entrer un nombre de riz à définir !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (isNaN(args[1])) {
        embed.setDescription(`Erreur: **${args[1]}** n'est pas un nombre !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }

    let cible = message.mentions.users.first();
    let ciblem = message.guild.id + cible.id;
    client.rice.set(ciblem, args[1]);

    embed.setDescription(`Le riz de ${cible.username} à bien été défini à ${args[1]} !`);
    embed.setColor(0x45f442);
    message.channel.send(embed).then(response => {
        response.delete(5000);
        message.delete();
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['setmoney', 'setriz', 'setriceballs'],
    permLevel: 4
};

exports.help = {
    name: 'setrice',
    description: 'Définir le nombre de boulettes de riz qu\'on a sur son compte',
    usage: 'setrice <@utilisateur> <rice>'
};