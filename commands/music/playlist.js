const Command = require('../../structures/command.js');
const ytapi = require('simple-youtube-api');
const Discord = require('discord.js');

module.exports = class extends Command {
  constructor(client, filePath, group) {
    super(client, filePath, group, {
      conf: {
        enabled: true,
        guildOnly: true,
        aliases: ['pl'],
      },
      help: {
        name: "playlist",
        description: "Plays a playlist through a youtube search",
        usage: "playlist [search] [term]",
        examples: ["playlist 99lives 99", 'playlist search maron music']
      },
      details: {
        fileName: 'playlist',
        base: 'playlist',
        perm: "USE_VAD",
        reqPerms: ['CONNECT', 'SPEAK', 'USE_VAD', 'EMBED_LINKS'],
      }
    })
  }
  async execute(client, message, args, MAM, serverQueue) {
    try {
        let override = false;
        
        if (message.author.id == client.config.ownerID) override = true;
        if (!args[0]) return message.send(MAM);
        if (!message.member.voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel`)
        
        const youtube = new ytapi(client.config.youtubeAPIKey);
        const voiceChannel = message.member.voiceChannel;
        if (args[0] === 'search') {
        
            args.shift();
            const search = args.join(" ");
            const playlists = await youtube.searchPlaylists(search, 10);
            let index = 0;
        
            const embed = new Discord.RichEmbed()
            .setColor(0xff7474)
            .setAuthor('Playlist Selection', 'https://cdn.discordapp.com/emojis/410586364149628950.png?v=1')
            .setDescription(`${playlists.map(pl2 => `**${++index}** - ${`[${pl2.title}](${pl2.url})`} by ${pl2.channel.title}`).join('\n')}\n Enter a number 1-10 `)
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            
            try {
            
                const response = await message.awaitreply({embed}, 10000);

                response.text = Math.round(response.text);

                if (!isNaN(response.text) && response.text > 0 && response.text < 11) {
                    
                    const playlistIndex = parseInt(response.text);
                    const playlist = await client.functions['handlePlaylist'](message, playlists[playlistIndex - 1].id, {
                        override: override
                    });

                    return false;
            
                } else
            
                if (["n", "no", "cancel", "exit", "stop"].includes(response.text)) {
                
                    response.message.edit(`${message.emote('success')} Action cancelled.`);
                
                    return false;
                
                };
                return false;
            } catch (e) {
                return message.send(`${message.emote('error')} Cancelling [ERROR] ${e}`);
            };
        
        } else {
        
            const search = args.join(" ");
            const playlists = await youtube.searchPlaylists(search, 1);
            const playlist = playlists[0].id;
        
            client.functions['handlePlaylist'](message, playlist, {
                override: override
            });
        
        };
        return false;
    
    } catch (err) {
        message.send(await client.functions['errorMessage'](err, message))
    };
  };
};