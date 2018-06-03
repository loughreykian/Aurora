const r = require('rethinkdb');

module.exports = async function(client, guild) {
    try {
        
        //if(await r.table('guilds').get(guild.id).run(client.dbConnection) != null || await r.table('perms').get(guild.id).run(client.dbConnection) != null) { 

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
            
            await r.table('perms').insert({
                id: guild.id,
            }).run(client.dbConnection);
            
            client.logger.log(`Successfully inserted settings & perms for: ${guild.id}`);            
            return `Inserted settings & perms for: ${guild.id}`;

        /*} else {
            return 'Guild already in database.'
        };*/

    } catch (e) {
        client.logger.error(`Error inserting settings for ${guild.id}: ${e}`);
        return 'error';
    };   
};