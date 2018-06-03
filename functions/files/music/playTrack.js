const { stripIndents } = require('common-tags');

module.exports = async function(message, track, options) {
  	try {
		  if (message.author.id == message.client.config.ownerID) options.override = true;
	  
		const serverQueue = message.client.queue[message.guild.id];
	  
		if (!track) {
    		delete message.client.queue[message.guild.id];
    		if (message.client.voiceEngine.get(message.guild.id) != undefined) {
      			message.client.voiceEngine.leave(message.guild.id)
    		};
    		return false;
  		};
	  
	  	if (message.client.voiceEngine.get(message.guild.id) == undefined) {
    		if (message.member.voiceChannel) {
      			await messsage.client.joinChan(message.guild, message.member.voiceChannel)
    		};
  		};
	  
		if (!options.playlist && !options.override && track.duration > 3600000) return message.send(`${message.emote('exclamation')} Can not play songs over 1 hour`);
  		if (!options.playlist && !options.override && serverQueue ? (serverQueue.tracks.length + track.length) > 75 : track.length > 75) return message.send(`${message.emote('error')} Queue can not contain over 75 songs`)
	  
		const player = message.client.voiceEngine.get(message.guild.id).play(track.track);
	  	let mPlayer = message.client.voiceEngine.get(message.guild.id);
		  
		mPlayer.setMaxListeners(2);
		mPlayer.once('end', async () => {
    		if (!serverQueue) {
    			await message.client.functions['discordBug'](client);
	      		message.client.voiceEngine.leave(message.guild.id);
    	  		return false;
    		};
    		serverQueue.tracks.shift();
    		setTimeout(() => {
      			message.client.functions['playTrack'](message, serverQueue.tracks[0], {
        			playlist: options.playlist,
        			override: options.override,
        			link: false
      			});	
    		}, 100);
    		return false;
  		});
  		mPlayer.once('error', (err) => {
			message.client.logger.log(`An error occured while playing the track: ${err}`);
			
			if(!options.playlist) return message.send(`${message.emote('error')} An error occured while playing the track: \`${err}\`. Queue has been cleared.`);	  

    		if(serverQueue) {
	  			serverQueue.tracks.shift();
	  			delete message.client.queue[message.guild.id];
    		};
    		return false;
  		});
  
  		if(await message.settings({ grab: true, key: 'announce-songs'}) == false) return false;
	  
	  	let msg = await serverQueue.channel.text.send(`${message.emote('mag')}  Searching \`${track['url']}\``);
  		msg.edit(stripIndents(`${message.emote('youtube')} **Now playing:** \`${track.title}\` (\`${message.ms(track.duration)}\`) | <${track.url}>
        	**Artist:** ${track.artist} | **Requested by:** ${track.requester.user.tag} `));
	  
		return false;
	} catch (e) {
		return message.send(`${message.emote('error')} An error occured while playing the track: ${e}`);
	};
};
