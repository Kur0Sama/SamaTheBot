const Discord = require('discord.js');
const config = require('../storage/config.json');

module.exports = (client, member) => {
    let embed = new Discord.RichEmbed();
    let permmembrerole = member.guild.roles.find('name', config.join.member_role_perm);
    let membrerole = member.guild.roles.find('name', config.join.member_role);
    let general = member.guild.channels.find('name', 'general');

    member.addRole(membrerole);
    member.addRole(permmembrerole);

    embed.setTitle(`${member.user.username}#${member.user.discriminator} à rejoins le serveur`);
    embed.setDescription(`Veuillez lui souhaiter la bienvenue !`);
    embed.setColor(0x41c7f4);

    if (member.guild.id == config.guilds.samafamily.id) {
        general = member.guild.channels.get(config.guilds.samafamily.general);
        general.send(embed);
        return;
    }

    general.send(embed);
};