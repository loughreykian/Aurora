const Command = require('../../structures/command.js');
const ytapi = require('simple-youtube-api');

module.exports = class extends Command {
  constructor(client, filePath, group) {
    super(client, filePath, group, {
      conf: {
        enabled: true,
        guildOnly: true,
        aliases: ['p'],
      },
      help: {
        name: "play",
        description: "Plays a track through a youtube search/url/playlisturl",
        usage: "play [url/term]",
        examples: ["play better times", "play https://youtube.com/watch?v=3b6QftVnwaE", "play https://www.youtube.com/playlist?list=PLc65IbL0RJ336bVzuuXHd2SQ68KTDKheq"]
      },
      details: {
        fileName: 'play',
        base: 'play',
        perm: "USE_VAD",
        reqPerms: ['CONNECT', 'SPEAK', 'USE_VAD'],
      }
    })
  }
  async execute(client, message, args, MAM, serverQueue) {
    try {
        
        if (!args.join(" ")) return message.send(MAM)
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel`);
        if (!voiceChannel.joinable) return message.send(`${message.emote('error')} Unable to join channel`);

        const owner = message.author.id == client.config.ownerID ? true : false;
        const search = args.join(" ");
        const url = search.replace(/<(.+)>/g, '$1');
        
        if (message.guild.member(client.user).voiceChannel != undefined) {
            if (message.guild.member(client.user).voiceChannel != message.member.voiceChannel && message.member.voiceChannel != undefined && message.guild.member(client.user).voiceChannel.members.size > 1) return message.send(`${message.emote('error')}  Currently connected to another voice channel `)
        
        };
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            try {
          
                const youtube = new ytapi(client.config.youtubeAPIKey);
                const pl = await youtube.getPlaylist(url);
                
                client.functions['handlePlaylist'](message, pl, {
                    override: owner
                });
                return false;
            
            } catch (err) {
                message.send(`${message.emote('exclamation')} Could not get playlist.`)
            };
        } else {
            
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/watch(.*)$/)) {
                return client.functions['handleTrack'](message, search, voiceChannel, {
                    playlist: false,
                    override: owner,
                    link: true
                });
            };
            return client.functions['handleTrack'](message, search, voiceChannel, {
                playlist: false,
                override: owner,
                link: false
            });
      };
      
      return false;
    
    } catch (err) {
      message.send(await client.functions['errorMessage'](err, message))
    };
  };
};