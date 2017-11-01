const Discord = require('discord.js');

exports.run = (client, message, args) => {
    var embed = new Discord.RichEmbed();
    let command;
    if (client.commands.has(args[0])) {
        command = args[0];
    } else if (client.aliases.has(args[0])) {
        command = client.aliases.get(args[0]);
    }
    if (!command) {
        embed.setDescription(`La commande **${args[0]}** n'existe pas !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000)
        });
        return;
    } else {
        embed.setDescription(`Chargement de la commande **${args[0]}** ...`);
        embed.setColor(0x41c7f4);
        message.channel.send(embed).then(msg => {
            client.reload(command).then(() => {
                embed.setDescription(`La commande **${args[0]}** à bien été rechargée !`);
                embed.setColor(0x45f442);
                message.delete();
                msg.edit(embed).then(response => {
                    response.delete(5000)
                });
            }).catch(err => {
                embed.setDescription(`Erreur lors du rechargement de la commande **${args[0]}** : \n\`\`\`${err}\`\`\``);
                embed.setColor(0xf44141);
                message.delete();
                msg.edit(embed).then(response => {
                    response.delete(5000)
                });
            });
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rl'],
    permLevel: 5,
};

exports.help = {
    name: 'reload',
    description: 'Recharger le fichier d\'une commande.',
    usage: 'reload <commande>'
}