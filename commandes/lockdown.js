const ms = require('ms');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();

    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock', 'unblock'];
    if (!time) {
        embed.setDescription(`Erreur: Il me faut une durée (En jours, en heures, en minutes, ou en secondes)`);
        embed.setColor(0xf44141);
        message.delete();
        message.channel.send(embed).then(response => {
            response.delete(5000);
        });
        return;
    }

    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.delete();
            embed.setDescription(`Tout le monde peut désormais renvoyer des messages dans ce channel !`);
            embed.setColor(0x45f442);
            message.channel.send(embed).then(response => {
                response.delete(5000);
            });
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.delete();
            embed.setDescription(`Le channel à été bloqué pendant **${ms(ms(time), { long:true })}**`);
            embed.setColor(0x45f442);

            message.channel.send(embed).then(msg => {
                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(() => {
                        embed.setDescription(`Tout le monde peut désormais renvoyer des messages dans ce channel !`);
                        embed.setColor(0x45f442);
                        msg.edit(embed).then(response => {
                            response.delete(5000);
                        });
                    }).catch(console.error);

                    delete client.lockit[message.channel.id];
                }, ms(time));

            }).catch(error => {
                console.log(error);
            });
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['lock', 'lockit', 'block'],
    permLevel: 3
};

exports.help = {
    name: 'lockdown',
    description: 'Désactiver les messages d\'un channel pendant un certain temps',
    usage: 'lockdown <temps>'
};