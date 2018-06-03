const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
            },
            help: {
                name: "seek",
                description: "Seek to a specific point in the current playing song (seconds).",
                usage: "seek <seconds>",
            },
            details: {
                fileName: 'seek',
                base: 'seek',
                perm: "USE_VAD"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
        
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel`);
            if(!message.guild.serverQueue) return message.send(`${message.emote('error')} No music to seek`);
            if(message.guild.member(client.user).voiceChannel != message.member.voiceChannel && message.member.voiceChannel != undefined && message.guild.member(client.user).voiceChannel.members.size > 1) return message.send(`${message.emote('error')}  Can't seek another channels music. `)
            
            let time = args.join(" ");
            
            if(!time) return message.send(MAM);
            if(!message.guild.serverQueue.tracks[0].seekable) return message.channek.send(`${message.emote('error')} Current song is not seekable`);
            
            if(time.includes(':')) {

                let splitTime = time.split(':');
                if(splitTime.length > 2) return message.send(`${message.emote('error')} Must be a valid time.`)
                
                let time1 = splitTime[0],
                    time2 = splitTime[1];

                time = Math.round(((time1 * 60000) + (time2 * 1000)) / 1000);

            };

            if(isNaN(time) || time > message.guild.serverQueue.tracks[0].duration) return message.send(`${message.emote('error')}  Must be a valid time.`);

            time = Math.round(time * 1000);

            message.client.voiceEngine.get(message.guild.id).seek(time);
            return message.send(`${message.emote('success')} Seeked to position \`${message.ms(time)}\`.`);
        
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        };
    };
};