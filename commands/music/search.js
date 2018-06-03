const Command = require('../../structures/command.js');
const Discord = require('discord.js');
const ytapi = require('simple-youtube-api');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['s'],
            },
            help: {
                name: "search",
                description: "Searches YouTube for songs, then plays them.",
                usage: "search <term>",
            },
            details: {
                fileName: 'search',
                base: 'search',
                perm: "USE_VAD",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue) {
        try {
            let override = false;
            if(message.author.id == client.config.ownerID) override = true;
            const youtube = new ytapi(client.config.youtubeAPIKey);
            const search = args.join("  ");
            const voiceChannel = message.member.voiceChannel;
            if(!voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel.`)
            
            const videos = await youtube.searchVideos(search, 10);
            let index = 0;
            
            const embed = new Discord.RichEmbed()
            .setColor(0xff7474)
            .setTitle('Song Selection', 'https://cdn.discordapp.com/emojis/410586364149628950.png?v=1')
            .setDescription(`${videos.map(video2 => `**${++index}** - ${`${video2.title} | [Link](${video2.url})`}`).join('\n')}\nPlease provide a value to select one of the search results ranging from 1-10.`)
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            
            try {
            
                const response = await message.awaitreply({embed});
                if (!isNaN(response.text) && response.text > 0 && response.text <= 10) {
                const videoIndex = parseInt(response.text);
                const id = videos[videoIndex - 1].id;
                const video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                client.functions['handleTrack'](message, id, voiceChannel, {
                    override: override,
                    link: false,
                    playlist: false
                });
                } else
                if (["n","no","cancel", "exit", "stop"].includes(response.text)) {
                    response.message.edit(`${message.emote('success')} Action cancelled.`);
                    return false;
                };
            } catch (e) {
                message.send(`${message.emote('error')} Cancelling [ERROR]`);
            }
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        };
    };
};