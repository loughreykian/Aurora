const r = require('rethinkdb');
const Discord = require('discord.js');
const emotefile = new Object(require(`${process.cwd()}/structures/settings.json`));

/*
- Grab or update a settings.

- Format: <message>.settings(options)
- Options: {
- grab: <boolean>,
- view: <boolean>,
- key: <value>,
- value: <value>
- }

*/
module.exports = async function(message, options) {
	try {

      if(!message.guild.available) return message.send(`${message.emote('exclamation')} Could not get settings.`);
		
		if(options) {

        	if(options.grab) {
         		try {

					if(options.key == (null || undefined)) return 'DNE';
            		let results = await r.table('guilds').get(message.guild.id).run(message.client.dbConnection);
				
					let Key = emotefile.names[options.key]
    	        	return results[Key]

        	 	} catch (e) {
					return '';
				};
			} // Break
			
			else

      	if(options.view) {
         	try {

					if(options.key == (null || undefined)) return 'DNE';
					if(!emotefile['names'][options.key]) return message.send(`${message.emote('error')} That key does not exist.`);

   		      		let result = await r.table('guilds').get(message.guild.id).run(message.client.dbConnection);
					let results = new Object(result);

					let icon = emotefile['icons'][options.key];
					let type = options.key;

					options.key = emotefile.names[options.key];

					if(['announcesongs', 'musicenabled', 'preventduplicates'].includes(options.key.toLowerCase())) {
						return message.send(`${icon} ${type} is currently \`${results[options.key] == true ? 'enabled' : 'disabled'}\``);
					};
					if(['djrole', 'prefix'].includes(options.key.toLowerCase())) {
						return message.send(`${icon} The current ${type} is \`${results[options.key]}\``);
					} else {
						return message.send(`${message.emote('error')} That key does not exist.`);
					};
          
         	} catch (e) {
					message.send(`${message.emote('exclamation')} That setting does not exist.`);
	         	return '';
				};
			} //Break
			  
			else
		  
        	if(options.update) {
         		try {
				
					if(options.value == (null || undefined) || options.value == (null || undefined)) return 'DNE';
					if(!options.key) return message.send(`${message.emote('error')} Please provide a key.`);
					if(!options.value) return message.send(`${message.emote('error')} Please provide a value.`);

					if(['announce-songs', 'prevent-duplicates', 'music-enabled'].includes(options.key.toLowerCase())) {
						if(!['enable', 'disable', 'true', 'false'].includes(options.value.toLowerCase())) return message.send(`${message.emote('error')} Value must be \`true\`, \`false\`, \`enable\` or \`disable\`.`);
						let val = options.value.toLowerCase();
            			if(val === 'enable') options.value = true;
            			if(val === 'disable') options.value = false;            
            			if(val === 'true') options.value = true;
            			if(val === 'false') options.value = false; 
					} else

					if(options.key.toLowerCase() === 'dj-role') {
						let role = message.guild.roles.find(r => r.name.toLowerCase().startsWith(options.value.toLowerCase()));
						if(!role) return message.send(`${message.emote('error')} That role does not exist.`);
						options.value = role.name;
					};

            	await r.table('guilds').get(message.guild.id).update({[emotefile.names[options.key]]: options.value}).run(message.client.dbConnection);
				message.send(`${message.emote('success')} Updated ${options.key} to \`${options.value}\``);
	           	return `Updated settings for ${message.guild.id}`;
			 
				} catch (e) {
					message.send(`${message.emote('error')} Error updating settings. ${e.stack}`);
    		      	return '';
				};
			} // Break
			
			else

			if(options.reset) {
				try {
	
					let msg = await message.send(`${message.emote('dot')} Resetting settings...`);
					await r.table('guilds').get(message.guild.id).delete().run(message.client.dbConnection);
					message.client.functions['dbAddSettings'](message.client, message.guild);
					return msg.edit(`${message.emote('success')} All settings reset.`);
	
				} catch (e) {
					message.send(`${message.emote('exclamation')} Error resetting settings. ${e}`);
					return '';	
				};
			} // Break
		} // Break
		
		else
		
      	{
		
      		return await message.client.functions['displaySettings'](message);
		
		}; // Break

   	} catch (e) {

      message.send(`${message.emote('exclamation')} Could not get settings: ${e}`)
      return '';
	
	};
};