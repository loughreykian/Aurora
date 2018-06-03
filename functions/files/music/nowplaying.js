const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = function(message, serverQueue) {
	try {
		if (!serverQueue) return false;
		  
		const embed = new Discord.RichEmbed()
    	.setColor(0xff7474)
    	.setThumbnail(serverQueue.tracks[0].thumbnailURL)
    	.setTitle(`${message.emote('track')} Now Playing`)
    	.setDescription(stripIndents(`
      		[${serverQueue.tracks[0].title}](${serverQueue.tracks[0].url})

      		\`${message.client.functions['musicBar'](message)}\` (\`${message.ms(message.client.voiceEngine.get(message.guild.id).state.position)}/${message.ms(serverQueue.tracks[0].duration)}\`)

      		**Artist:** \`${serverQueue.tracks[0].artist}\` | **Requested by:**  \`${serverQueue.tracks[0].requester.user.tag}\`
      	`));
  
		  return embed;
	} catch (e) {
		return new Discord.RichEmbed({
			title: 'Now Playing',
			description: 'Music ended.'
		});
	};
};