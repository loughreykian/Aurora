module.exports = function(message, name) {

try {
	try {
		//Events
		try {
			const event = require(`${process.cwd()}/events/${name}.js`);
        	message.client.removeListener(name, event);
        	delete require.cache[require.resolve(process.cwd() + `/events/${name}.js`)];
        	message.client.on(name, event.bind(null, message.client));
        	delete require.cache[require.resolve(process.cwd() + `/events/${name}.js`)];
        	message.client.logger.reload(`Reloaded event: ${name}`);
        	return `${message.emote('success')} Reloaded event \`${name}\``;
		} catch (e) {
			//Modules
			try {
				delete require.cache[require.resolve(`${process.cwd()}/modules/${name}`)];
				message.client.logger.reload(`Reloaded module: ${name}`);
				return `${message.emote('success')} Reloaded module \`${name}\``;
			} catch (e) {
				//Structures
				try {
					delete require.cache[require.resolve(`${process.cwd()}/structures/${name}`)];
					message.client.logger.reload(`Reloaded structure: ${name}`)
					return `${message.emote('success')} Reloaded structure \`${name}\``;
				} catch (e) {
					//Functions
					try {
						const path = `${process.cwd()}${message.client.functions[`${name}path`]}`;
                    	delete require.cache[require.resolve(path)];
                    	message.client.functions[name] = require(path);
                    	message.client.logger.reload(`Reloaded function: ${name}`);
                    	return `${message.emote('success')} Reloaded function \`${name}\``;
					} catch (e) {
						//Commands
						try {
							let cmd = name.toLowerCase();
							if(message.content.includes(':')) cmd = message.content.split(':')[1];
							if(message.client.commands[cmd] || message.client.aliases[cmd]) {
								if(message.client.commands[cmd]) {
									cmd = message.client.commands[cmd];
								};
								if(message.client.aliases[cmd]) {
									cmd = message.client.commands[message.client.aliases[name]];
								};
								delete require.cache[require.resolve(`${process.cwd()}/commands/${cmd.path}`)];
      							let command = new (require(`${process.cwd()}/commands/${cmd.path}`))(null, cmd.path, cmd.group);
     							message.client.commands[command.details.base] = command;
      							if(command.conf.aliases) {
     		   						command.conf.aliases.forEach(alias => {
          								message.client.aliases[alias] = command.details.base;
        							});
      							};
      							message.client.logger.reload(`Reloaded command: ${command.details.base}`);
      							return `${message.emote('success')} Reloaded command \`${cmd.details.base}\``;
							};
						} catch (e) {
							return `${message.emote('exclamation')} Error reloading command: ${e}`
						}; 	
					};
				};
			};
		};
	} catch (e) {
		return `${message.emote('exclamation')} Error reloading file.`
	}
	} catch (e) {
		return `${message.emote('exclamation')} Could not find file.`;
	}
}