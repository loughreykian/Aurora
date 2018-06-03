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
                name: "pause",
                description: "Pauses the current playback.",
                usage: "pause",
            },
            details: {
                fileName: 'pause',
                base: 'pause',
                perm: "USE_VAD"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            
            if(!serverQueue) return message.send(`${message.emote('error')} No music playing`)
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel`);
            
            if(!serverQueue && !serverQueue.playback) return message.send(`${message.emote('error')} No music playing`);
            if(message.guild.member(client.user).voiceChannel != message.member.voiceChannel && message.member.voiceChannel != undefined && message.guild.member(client.user).voiceChannel.members.size > 1) return message.send(`${message.emote('error')} Must be in the same voice channel as me.`)
            if(!serverQueue.playback) return message.send(`${message.emote('pause')} Music already paused`);
            
            serverQueue.playback = false;
            client.voiceEngine.get(message.guild.id).pause(true);
            message.send(`${message.emote('pause')} **Paused**`)
            return false;
        
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        };
    };
};