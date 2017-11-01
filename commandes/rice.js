const Discord = require('discord.js');
const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let auteur = message.guild.id + message.author.id;

    message.delete();

    embed.setTitle(`Economie sur ${message.guild.name}`);
    embed.setDescription('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    embed.addField(`Titulaire`, `${message.author.username}`, false);
    embed.addField(`Boulettes de riz`, `**${client.rice.get(auteur)}** :rice_cracker:`, false);
    embed.setColor(0xf4f442);
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['money', 'riz', 'riceballs'],
    permLevel: 0
};

exports.help = {
    name: 'rice',
    description: 'Voir le nombre de boulettes de riz qu\'on a sur son compte',
    usage: 'rice'
};