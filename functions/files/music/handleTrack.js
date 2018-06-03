const { stripIndents } = require('common-tags');
const { Util } = require('discord.js');

module.exports = async function(message, search, voiceChannel, options) {
	try {

		if (!voiceChannel.joinable) return message.send(`${message.emote('error')}  Unable to join channel `);
		if (message.author.id == message.client.config.ownerID) options.override = true;

		const settings = message.client.config;
		const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
		args.shift();
		let item = search;

		if(!options.playlist) item = await message.client.functions['getTrack'](message.client, search, {
	  		link: options.link
		}).catch(e => message.send(`${message.emote('error')} Unable to play: \`${e}\`. Report this bug in the support server: ${message.client.config.serverInvite}`));

		if (!item || !item.info) {
	  		if (!options.playlist) message.send(`${message.emote('exclamation')} Could not get song.`)
	  		return false;
		};

		const serverQueue = message.client.queue[message.guild.id];
		if (!options.override && item.info.length > 10800000) {
    		if (!options.playlist) return message.send(`${message.emote('exclamation')} Can not play songs over 3 hour.`);
	  		return false;
		};

		const track = new Object({
	  		length: 1,
	 	  	info: item,
	  		search: search,
	  		track: item.track,
	  		url: `https://youtu.be/${item.info.identifier}`,
	  		urlLong: item.info.uri,
	  		id: item.info.identifier,
	  		duration: item.info.length,
	 	  	seekable: item.info.isSeekable,
	  		title: Util.escapeMarkdown(item.info.title),
	  		requester: message.member,
	  		artist: item.info.author,
	  		thumbnailURL: `https://img.youtube.com/vi/${item.info.identifier}/default.jpg`
		});

		if (!serverQueue) {
	  		const queueConstruct = new Object({
				channel: {
		  			text: message.channel,
		  			voice: voiceChannel
				},
				connection: null,
				tracks: [],
				volume: 25,
				playback: true
	  		});
	  		message.client.queue[message.guild.id] = queueConstruct;
	  		queueConstruct.tracks.push(track);

		  	try {

				let connection = await message.client.functions['joinChan'](message, voiceChannel);
				queueConstruct.connection = connection;
				if (!options.override && !options.playlist && serverQueue ? (serverQueue.tracks.length + queueConstruct.tracks[0].length) > message.client.config.queueSize : queueConstruct['tracks'][0].length > message.client.config.queueSize) return message.send(`${message.emote('error')} Queue can not contain over ${message.client.config.queueSize} songs`);
				message.client.functions['playTrack'](message, queueConstruct.tracks[0], {
					playlist: options.playlist,
					override: options.override
				});

	  		} catch (e) {
				if (serverQueue) {
		  		delete message.client.queue[message.guild.id]
				};
				return message.send(`${message.emote('error')} Unable to play: \`${e}\``);
	  		};

		} else {

	  		if (!options.override && !options.playlist && serverQueue ? (serverQueue.tracks.length + track.length) > message.client.config.queueSize : track.length > message.client.config.queueSize) return message.send(`${message.emote('error')} Queue can not contain over ${message.client.config.queueSize} songs`)
	  		serverQueue.tracks.push(track);
	  		if (options.playlist) return false;

	  		let msg = await serverQueue.channel.text.send(`${message.emote('mag')} Searching \`${track.url}\``);

	  		msg.edit(stripIndents(`${message.emote('add')} **Song:** \`${track.title}\` (\`${message.ms(track.duration)}\`) added to queue by **${track.requester.user.tag}**
				**Artist:** ${track.artist} | **Link:** <https://youtu.be/${track.id}>`));
	  		return false;

		};

  	} catch (err) {
		return message.send(message.client.functions['errorMessage'](err, message))
  	};
};
