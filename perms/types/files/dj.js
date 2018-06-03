const r = require('rethinkdb');
const permFile = require(`${process.cwd()}/structures/settings.json`);

module.exports = async function(message) {
    try {

        if(!message.command) return false;
        //if(message.author.id == message.client.config.ownerID) return true;
        //if(['system', 'utility'].includes(message.command.group)) return false;

        const permsTable = await r.table('perms').get(message.guild.id).run(message.client.dbConnection);
        
        const settingsTable = await r.table('guilds').get(message.guild.id).run(message.client.dbConnection);
        
        const role = message.guild.roles.find(r => r.name.toLowerCase() == settingsTable['djRole'].toLowerCase());
        
        if(!role) return false;

        if(message.member.roles.has(role.id)) return true;

        return false;

    } catch (e) {
        return false;
    };
};