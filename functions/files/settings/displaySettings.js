const { RichEmbed } = require('discord.js');
let emotefile = new Object(require(`${process.cwd()}/structures/settings.json`));

module.exports = async function(message) {
	try {
		const embed = new RichEmbed()
		.setColor(0xfe6f5e)
		.setTitle(`Settings for ${message.guild.name}`)
		.addField(`${emotefile['icons']['prefix']} Prefix`, `Key: \`prefix\``, true)
		.addField(`${emotefile['icons']['music-enabled']} Music Enabled`, `Key: \`music-enabled\``, true)
		.addField(`${emotefile['icons']['announce-songs']} Announce Songs`, `Key: \`announce-songs\``, true)
		.addField(`${emotefile['icons']['prevent-duplicates']} Prevent Duplicates`, `Key: \`prevent-duplicates\``, true)
		.addField(`${emotefile['icons']['dj-role']} DJ Role`, `Key: \`dj-role\``, true)
		.setFooter(`Use ${await message.settings({ grab: true, key: 'prefix'})}settings <key> [value] to edit a value`)

		return message.send({embed});
	} catch (e) {
		return message.send(`${message.emote('error')} Error displaying settings.`);
	};
};