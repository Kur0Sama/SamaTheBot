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
    if (!message.guild.member(cible).bannable) {
        embed.setDescription(`Erreur: Je ne peut pas bannir cette personne !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    message.delete();
    embed.setDescription(`${cible.username} à bien été banni !`);
    embed.setColor(0x45f442);
    message.channel.send(embed).then(response => {
        response.delete(5000);
    });
    embedlog.setTitle('Sanctions');
    embedlog.setDescription(`Action : **ban** \nCible : **${cible.username + '#' + cible.discriminator}** (${cible.id})\nAuteur : **${message.author.username + '#' + message.author.discriminator}** \nRaison : **${raison}**`);
    embedlog.setTimestamp();
    embedlog.setColor(0x41c7f4);
    logchannel.send(embedlog).then(
        message.guild.ban(cible)
    );
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['lban', 'lifeban'],
    permLevel: 4
};

exports.help = {
    name: 'ban',
    description: 'Bannir un utilisateur du serveur pour une certaine raison.',
    usage: 'ban <utilisateur> <raison>'
};