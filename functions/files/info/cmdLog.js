const moment = require('moment-timezone');

module.exports = function(message, cmd) {
  const chan = message.client.channels.get(message.client.config.logChan);
  let m = `[LOGS][CMD] User \`${message.author.tag}\` ran command \`${cmd.help.name}\` (\`${cmd.group.toLowerCase()}\`:\`${cmd.details.base}\`) in \`${message.guild.name}\` at ${moment().format("YYYY-MM-DD HH:mm:ss")}`;
  chan.send(m);
};
