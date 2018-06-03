const r = require('rethinkdb');

module.exports = async function(client) {
    try {
        this.logger.log('Successfully connected to the database.')
    } catch (e) {
        this.logger.error(`Error connecting to the database: ${e}`)
    };
};