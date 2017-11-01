var config = require('../storage/config.json');
const Discord = require('discord.js');
const moment = require('moment');

module.exports = (client, message) => {
  let embed = new Discord.RichEmbed();

  if (message.author.bot) return;

  let auteur = message.guild.id + message.author.id;
  let auteurg = message.author.discriminator + '#' + message.author.id;
  let command = message.content.split(' ')[0].slice(config.bot.prefix.length);
  let args = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;

  if (!client.grice.get(auteurg)) client.grice.set(auteurg, config.rice.globalStartMoney);
  if (!client.globalLastDaily.get(auteurg)) client.globalLastDaily.set(auteurg, 'Non-Collecté');
  if (!client.rice.get(auteur)) client.rice.set(auteur, config.rice.startMoney);
  if (!client.lastDaily.get(auteur)) client.lastDaily.set(auteur, 'Non-Collecté');

  if (message.channel.id === config.irc.a || message.channel.id === config.irc.b) {
    message.delete();
    moment.locale('fr');
    embed.setDescription(`\`\`\`${message.content.toString()}\`\`\``);
    embed.setAuthor(message.author.username + '#' + message.author.discriminator + ` | Le ${moment().format('LL')} à ${moment().format('LT')} | Sur ${message.guild.name}`, message.author.avatarURL);
    embed.setColor(0x42f498);
    client.channels.get(config.irc.a).send(embed);
    client.channels.get(config.irc.b).send(embed);
  }


  /*for (let channel in config.irc) {
    if (message.channel.id === channel) {
      message.delete();
      moment.locale('fr');
      embed.setDescription(`\`\`\`${message.content.toString()}\`\`\``);
      embed.setAuthor(message.author.username + '#' + message.author.discriminator + ` | Le ${moment().format('LL')} à ${moment().format('LT')} | Sur ${message.guild.name}`, message.author.avatarURL);
      embed.setColor(0x42f498);
      client.channels.get(channel).send(embed);
    }
    return;
  }*/

  if (!message.content.startsWith(config.bot.prefix)) return;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) {
      embed.setDescription(`Erreur: Tu n'a pas la permission requise ! (${perms} < ${cmd.conf.permLevel})`);
      embed.setColor(0xf44141);
      message.delete();
      message.channel.send(embed).then(response => {
        response.delete(5000);
      });
      return;
    }
    cmd.run(client, message, args, perms);
  }
};