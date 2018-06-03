const r = require('rethinkdb');
const permFile = require(`${process.cwd()}/structures/settings.json`);

module.exports = async function permLevel(message) {
    try {

    	if(!message.command) return false;

    	if(message.author.id == message.client.config.ownerID) return true;
        
        if(['BOT_OWNER', 'DONATOR', 'OPEN'].includes(message.command.details.perm)) {

            const permission = message.command.details.perm;
            
            if(permission === 'BOT_OWNER') return false;
            
            if(permission === 'DONATOR') {
                const guild = message.client.guilds.get('398673214445846529');

                if(guild.members.has(message.author.id)) {
                    const member = guild.members.get(message.author.id);

                    if(member.roles.has('419769738856759296')) return true;

                    return false;
                };

                return false;
            };

            if(permission === 'OPEN') return true;
        };

        if(message.author.id == message.guild.ownerID) return true;

        if(message.command.details.perm === 'OPEN') return true;

    	const permsTable = await r.table('perms').get(message.guild.id).run(message.client.dbConnection);

    	const perm = permsTable[message.command.details.base];

    	const group = permsTable[message.command.group];

    	if(group) {
    		const role = message.guild.roles.find(r => r.name.toLowerCase() == group.toLowerCase());

    		if(role) {
    			if(message.member.roles.has(role.id) || message.member.highestRole.position >= role.position) return true;

    			return false;
    		};

    		if(permFile[perm]) {
    			if(message.member.permissions.has(perm, false)) return true;
    		
    			return false;
    		};

    		return false;
    	};
    	
    	if(perm) {

    		const role = message.guild.roles.find(r => r.name.toLowerCase() == perm.toLowerCase());

    		if(role) {

    			if(message.member.roles.has(role.id) || message.member.highestRole.position >= role.position) return true;
    			
                return false;
    		};

    		if(permFile.perms.perms[perm]) {

    			if(message.member.permissions.has(perm, false)) return true;

    			return false;
    		};

    		return false;
    	};

        message.client.permLevels.toArray().forEach(level => {
            level(message);
        });

        if(message.member.permissions.has(message.command.details.perm, false)) return true; 

    	return null;

    } catch (e) {
        message.client.logger.error(`Error getting permlevel: ${e}`);
        return false;
    };
};