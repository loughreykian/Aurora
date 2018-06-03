const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['unpause'],
            },
            help: {
                name: "resume",
                description: "Resume the current playback",
                usage: "resume",
            },
            details: {
                fileName: 'resume',
                base: 'resume',
                perm: "USE_VAD"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!serverQueue) return message.send(`${message.emote('error')} No music playing`)
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel`);
            if(!serverQueue && serverQueue.playback) return message.send(`${message.emote('error')} No music playing`);
            if(message.guild.member(client.user).voiceChannel != message.member.voiceChannel && message.member.voiceChannel != undefined && message.guild.member(client.user).voiceChannel.members.size > 1) return message.send(`${message.emote('error')}  Currently connected to another voice channel `)
            if(serverQueue.playback) return message.send(`${message.emote('play')} Music already resumed`);
            serverQueue.playback = true;
            client.voiceEngine.get(message.guild.id).pause(false);
            message.send(`${message.emote('play')} **Resumed**`)
            return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}