const Discord = require('discord.js');
var config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let embedlog = new Discord.RichEmbed();
    let raison = args.splice(1).join(' ');
    let cible = args[0];
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
    if (!cible) {
        embed.setDescription(`Erreur: Il faut entrer au moins l'ID d'une personne !`);
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
    embed.setDescription(`L'ID ${cible} à bien été débanni !`);
    embed.setColor(0x45f442);
    message.channel.send(embed).then(response => {
        response.delete(5000);
    });
    embedlog.setTitle('Sanctions');
    embedlog.setDescription(`Action : **unban** \nCible : **${cible}** \nAuteur : **${message.author.username + '#' + message.author.discriminator}** \nRaison : **${raison}**`);
    embedlog.setTimestamp();
    embedlog.setColor(0x41c7f4);
    logchannel.send(embedlog).then(
        message.guild.unban(cible)
    );
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['deban'],
    permLevel: 4
};

exports.help = {
    name: 'unban',
    description: 'Débannir un utilisateur du serveur pour une certaine raison.',
    usage: 'unban <id utilisateur> <raison>'
};