module.exports = function(err, message) {
  let chan = message.client.channels.get(message.client.config.errorChan);
  chan.send(`[LOGS][ERROR] An error occured with a command: ${err}`);
  let msg = `⚠ \`${err}\` | Report this bug in: ${message.client.config.serverInvite}`;
  message.client.logger.error(`An error occured with a command: ${err.stack}`);
  return msg;
};
