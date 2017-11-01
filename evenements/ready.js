var config = require('../storage/config.json');

module.exports = (client) => {
    console.log('Je suis prêt !');

    client.user.setGame(config.bot.game);

    if (config.bot.state !== 'dnd' && config.bot.state !== 'idle' && config.bot.state !== 'online' && config.bot.state !== 'offline') return console.log('Erreur status invalide (001)');
    if (config.bot.state == 'dnd') return client.user.setStatus('dnd');
    if (config.bot.state == 'idle') return client.user.setStatus('idle');
    if (config.bot.state == 'online') return client.user.setStatus('online');
    if (config.bot.state == 'offline') return client.user.setStatus('offline');
};