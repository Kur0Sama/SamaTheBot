const Discord = require('discord.js');
const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let auteur = message.author.discriminator + '#' + message.author.id;

    message.delete();

    embed.setTitle(`Economie globale`);
    embed.setDescription('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    embed.addField(`Titulaire`, `${message.author.username}`, false);
    embed.addField(`Boulettes de riz`, `**${client.grice.get(auteur)}** :rice_cracker:`, false);
    embed.setColor(0xf4f442);
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['gmoney', 'griz', 'griceballs'],
    permLevel: 0
};

exports.help = {
    name: 'grice',
    description: 'Voir le nombre de boulettes de riz qu\'on a sur son compte global',
    usage: 'grice'
};