const Discord = require('discord.js');
var config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let embedlog = new Discord.RichEmbed();
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = client.channels.find('name', config.logs.channel);

    if (!logchannel) {
        embed.setDescription(`Erreur: Aucun channel appelé **${config.logs.channel}**`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (message.mentions.users.size < 1) {
        embed.setDescription(`Erreur: Il faut mentionner au moins une personne !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (raison.length < 1) {
        embed.setDescription(`Erreur: Il faut entrer une raison !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    message.delete();
    embed.setDescription(`${cible.username} à bien été warn !`);
    embed.setColor(0x45f442);
    message.channel.send(embed).then(response => {
        response.delete(5000);
    });
    embedlog.setTitle('Sanctions');
    embedlog.setDescription(`Action : **avertissement** \nCible : **${cible.username + '#' + cible.discriminator}** (${cible.id})\nAuteur : **${message.author.username + '#' + message.author.discriminator}** \nRaison : **${raison}**`);
    embedlog.setTimestamp();
    embedlog.setColor(0x41c7f4);
    logchannel.send(embedlog);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['avert', 'advert', 'warning', 'adv'],
    permLevel: 2
};

exports.help = {
    name: 'warn',
    description: 'Avertir un utilisateur pour une certaine raison.',
    usage: 'warn <@utilisateur> <raison>'
};