const r = require('rethinkdb');

module.exports = async function(client, guild) {
	try {

		await r.table('perms').insert({
            id: guild.id,
        }).run(client.dbConnection);

		client.logger.log(`Successfully inserted perms for: ${guild.id}`);            
        return `Inserted perms for: ${guild.id}`;
	
	} catch (e) {
		client.logger.error(`Error inserting perms: ${e}`);
		return `Error inserting perms: ${e}`;
	};
};