const r = require('rethinkdb');

module.exports = async function(client) {
	try {
		client.logger.log(`Successfully initialized the database.`);
	} catch (e) {
		client.logger.error(`Error initializing the database: ${e.stack}`);
	};
};