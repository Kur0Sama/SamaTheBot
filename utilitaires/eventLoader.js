const reqEvent = (event) => require('../evenements/' + event);

module.exports = client => {
    client.on('message', message => reqEvent('message')(client, message));
    client.on('ready', ready => reqEvent('ready')(client));
    client.on('guildMemberAdd', member => reqEvent('guildMemberAdd')(client, member));
};