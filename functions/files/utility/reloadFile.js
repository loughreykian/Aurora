module.exports = function(message, file) {

	if(file.includes('s?')) {
		file = file.split('?')[1];
		delete require.cache[require.resolve(process.cwd() + `/structures/${file}`)];
        message.send(`${message.emote('success')} Reloaded structure \`${file}\``)
        return message.client.logger.log(`Reloaded structure ${file}`)
	};
	if(file.includes('m?')) {
		file = file.split('?')[1];
		delete require.cache[require.resolve(process.cwd() + `/modules/${file}`)];
        message.send(`${message.emote('success')} Reloaded module \`${file}\``);
        return message.client.logger.log(`Reloaded module ${file}`);
	};
	if(file.includes('e?')) {
		file = file.split('?')[1];
		let event = message.client.functions['reloadEvent'](message, file).catch(e => { return message.send(e) });
        return message.send(`${message.emote('success')} Reloaded event \`${file}\``);
	};
	if(file.includes('f?')) {
		file = file.split('?')[1];
		const path = process.cwd() + message.client.functions[`${file}path`];
        delete require.cache[require.resolve(path)];
        message.client.functions[file] = require(path);
      	message.client.logger.log(`Reloaded function ${file}`);
        return message.send(`${message.emote('success')} Reloaded function \`${file}\``); 
	}
    if(message.client.functions[file]) {
        const path = process.cwd() + message.client.functions[`${file}path`];
        delete require.cache[require.resolve(path)];
        message.client.functions[file] = require(path);
      	message.client.logger.log(`Reloaded function ${file}`);
        return message.send(`${message.emote('success')} Reloaded function \`${file}\``);
    };

    if(file.includes(':')) file = file.split(':')[1];
    if(!message.client.commands[file] && !message.client.aliases[file]) return message.send(`${message.emote('error')} Could not find command.`);
    if(message.client.commands[file] || message.client.aliases[file]) {
        if(message.client.commands[file]) {
            file = message.client.commands[file];
        } else if(message.client.aliases[file]) {
            file = message.client.aliases[file];
            file = message.client.commands[file];
        }
    }
}