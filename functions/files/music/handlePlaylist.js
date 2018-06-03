module.exports = async function(message, playlist, options) {
 	try {
		
		if(message.author.id == message.client.config.ownerID) options.override = true
    	if (!message.member.voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel`);
		
		const serverQueue = message.client.queue[message.guild.id];
    	const voiceChannel = message.member.voiceChannel;
    	let msg = await message.send(`${message.emote('mag')} Fetching playlist...`);
    	const pl = await message.client.functions['getPlaylist'](message.client, playlist);
    	//if(!options.override && serverQueue ? (serverQueue.tracks.length + pl.length) > 75 : pl.length > 75) { pl.splice(76, pl.length.toFixed(2)), message.send(`${message.emote('list')} Shortened queue to \`${pl.length}\` songs.`) };
		
		msg.edit(`${message.emote('add')} Enqueued \`${pl.length}\` songs.`);
    	pl.forEach(async list => {
		  
			await message.client.functions['handleTrack'](message, list, voiceChannel, {
        		playlist: true,
        		override: options.override,
        		link: false
			  });
			  
		
		});
  	} catch (err) {
    	return message.send(`${message.emote('error')} Error getting playlist: ${e}`);
  	};
};
