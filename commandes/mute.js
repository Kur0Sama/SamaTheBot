const Discord = require('discord.js');
const config = require('../storage/config.json');

exports.run = (client, message, args) => {
    let embedlog = new Discord.RichEmbed();
    let embed = new Discord.RichEmbed();
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = client.channels.find('name', config.logs.channel);
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', config.perms.mute_role);
    if (!logchannel) {
        embed.setDescription(`Erreur: Aucun channel appelé **${config.logs.channel}**`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (!muteRole) {
        embed.setDescription(`Erreur: Aucun role appelé **${config.perms.mute_role}**`);
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
    if (message.mentions.users.size < 1) {
        embed.setDescription(`Erreur: Il faut mentionner au moins une personne !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
        embed.setDescription(`Erreur: Je n'ai pas la permission pour ajouter / enlever des roles !`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }
    if (message.guild.member(cible).roles.has(muteRole.id)) {
        message.delete();
        embed.setDescription(`${cible.username} à bien été unmute !`);
        embed.setColor(0x45f442);
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        embedlog.setTitle('Sanctions');
        embedlog.setDescription(`Action : **unmute** \nCible : **${cible.username + '#' + cible.discriminator}** (${cible.id})\nAuteur : **${message.author.username + '#' + message.author.discriminator}** \nRaison : **${raison}**`);
        embedlog.setTimestamp();
        embedlog.setColor(0x41c7f4);
        message.guild.member(cible).removeRole(muteRole).then(() => {
            client.channels.get(logchannel.id).send(embedlog).catch(console.error);
        });
    } else {
        message.delete();
        embed.setDescription(`${cible.username} à bien été mute !`);
        embed.setColor(0x45f442);
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        embedlog.setTitle('Sanctions');
        embedlog.setDescription(`Action : **mute** \nCible : **${cible.username + '#' + cible.discriminator}** \nAuteur : **${message.author.username + '#' + message.author.discriminator}** \nRaison : **${raison}**`);
        embedlog.setTimestamp();
        embedlog.setColor(0x41c7f4);
        message.guild.member(cible).addRole(muteRole).then(() => {
            client.channels.get(logchannel.id).send(embedlog).catch(console.error);
        });
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unmute', 'rolemute'],
    permLevel: 2
};

exports.help = {
    name: 'mute',
    description: 'Mute un utilisateur.',
    usage: 'mute/unmute <@utilisateur>'
};