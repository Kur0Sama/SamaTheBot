const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    if (args.length < 1) {
        embed.setDescription(`Erreur: Il faut entrer un nombre !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (isNaN(args)) {
        embed.setDescription(`Erreur: **${args[0]}** n'est pas un nombre !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    let toFetch = (parseInt(args) + 1);
    if (toFetch > 100) {
        embed.setDescription(`Erreur: **${args[0]}** est plus grand que 99 !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    message.channel.fetchMessages({
        limit: toFetch
    }).then(fetched => {
        message.channel.bulkDelete(fetched).then(() => {
            embed.setDescription(`**${fetched.size - 1}** messages ont bien été supprimés !`);
            embed.setColor(0x45f442);
            message.channel.send(embed).then(response => {
                response.delete(5000);
            });
        });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['purge', 'clean'],
    permLevel: 2,
};

exports.help = {
    name: 'clear',
    description: 'Supprimer un certain nombre de messages dans le salon.',
    usage: 'clear <1~99>'
};