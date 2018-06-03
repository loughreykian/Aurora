const r = require('rethinkdb');

module.exports = async function(client, guild) {
    try {
        //client.logger.log(`Successfully removed settings for: ${guild.id}`);
    } catch (e) {
        client.logger.error(`Error removing settings for ${guild.id}: ${e}`);
    };
};