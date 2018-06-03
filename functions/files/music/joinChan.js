module.exports = async function (message, voiceChannel) {
 	try {
  		await message.client.voiceEngine.join({
    		guild: message.guild.id,
    		channel: voiceChannel.id,
   	 		host: "localhost"
  		}, { selfdeaf: true });
	} catch (e) {
		return message.send(`${message.emote('error')} Error joining channel.`);
	};
};
