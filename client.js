const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
var client = new Discord.Client();
var config = require('./storage/config.json');
require('./utilitaires/eventLoader')(client);

rice = new Enmap({
  provider: new EnmapLevel({
    name: 'rice'
  })
});

lastDaily = new Enmap({
  provider: new EnmapLevel({
    name: 'lastDaily'
  })
});

grice = new Enmap({
  provider: new EnmapLevel({
    name: 'grice'
  })
});

globalLastDaily = new Enmap({
  provider: new EnmapLevel({
    name: 'globalLastDaily'
  })
});

client.globalLastDaily = globalLastDaily;
client.grice = grice;
client.lastDaily = lastDaily
client.rice = rice;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commandes/', (err, files) => {
  if (err) console.error(err);
  console.log(`Chargement de ${files.length} commandes.`);
  files.forEach(f => {
    let props = require(`./commandes/${f}`);
    console.log(`Chargement de la commande: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commandes/${command}`)];
      let cmd = require(`./commandes/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', config.perms.mod_role);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', config.perms.admin_role);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  let owner_role = message.guild.roles.find('name', config.perms.owner_role);
  if (owner_role && message.member.roles.has(owner_role.id)) permlvl = 4;
  if (message.author.id === config.perms.owner_id) permlvl = 5;
  return permlvl;
};

client.login(config.bot.token);
