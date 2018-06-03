const r = require('rethinkdb');

module.exports = async function(client, guild) {
	try {

		await r.table('guilds').insert({
            id: guild.id,
            name: guild.name,
            prefix: '|',
            musicEnabled: true,
            announceSongs: true,
            preventDuplicates: false,
            blChan: [],
            blMem: [],
            djRole: 'DJ',
        }).run(client.dbConnection);
            
        client.logger.log(`Successfully inserted settings for: ${guild.id}`);            
        return `Inserted settings for: ${guild.id}`;

	} catch (e) {
		client.logger.error(`Error inserting settings: ${e}`);
		return `Error inserting settings: ${e}`;
	};
};