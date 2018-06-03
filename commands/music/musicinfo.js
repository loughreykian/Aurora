const Command = require('../../structures/command.js');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: false,
                guildOnly: true,
                aliases: ['mi', 'minfo'],
            },
            help: {
                name: "musicinfo",
                description: "Gives current info on music.",
                usage: "musicinfo",
            },
            details: {
                fileName: "musicinfo",
                base: 'musicinfo',
                perm: "EMBED_LINKS",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!serverQueue) return message.send(`${message.emote('error')}  No music playing to display info `)
            const serverBlacklisted = client.blacklist.get(message.guild.id);
            const embed = new Discord.RichEmbed()
            .setColor(0xd5c2d8)
            .setAuthor('Music Info', 'https://cdn.discordapp.com/emojis/411727336707457027.png?v=1')
            .setThumbnail('https://cdn.discordapp.com/emojis/411727336707457027.png?v=1')
            .addField('Now Playing', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) by \`${serverQueue.songs[0].channelTitle}\``)
            .addField('Bound Channel', `\`${serverQueue['channel']['text'].name.toProperCase()}\``, true)
            .addField('General Info', `${serverQueue.songs.length} songs in queue\n${serverQueue['volume'] * 50}% volume`, true)
            //.addField('Blacklisted Channels', serverBlacklisted ? serverBlacklisted.channels.map(c => c.name).join('\n') : "None", true)
            message.send({embed})
            return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}
