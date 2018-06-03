const { PlayerManager } = require('discord.js-lavalink');
const r = require('rethinkdb');

module.exports = (client) => {
  client.functions['dbInitialize'](client);
  try {
    client.voiceEngine = new PlayerManager(client, client.config.nodes, {
      user: client.user.id,
      shards: 1,
      region: client.config.region
    });
    client.logger.voiceEngine(`✔ voiceEngine started successfully.`)
  } catch (e) {
    client.logger.error(`✖ Error starting voiceEngine: ${e}`)
  };

  try {
    client.guilds.forEach(async g => {
      if(await r.table('guilds').get(g.id).run(client.dbConnection) == null || await r.table('perms').get(g.id).run(client.dbConnection) == null) {
        client.functions['dbAddGuild'](client, g);
      };
    });
  } catch (e) {
    console.log(`Error inserting settings for: ${g.id}`);
  };

  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");
};