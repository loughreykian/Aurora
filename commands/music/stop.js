const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['end'],
            },
            help: {
                name: "stop",
                description: "Stops the current playback, and leaves the voice channel.",
                usage: "stop",
            },
            details: {
                fileName: 'stop',
                base: 'stop', 
                perm: "MANAGE_MESSAGES"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')}  Get in a voice channel `);
            if(!serverQueue) return message.send(`${message.emote('error')}  No music playing `);
            if(message.guild.member(client.user).voiceChannel != message.member.voiceChannel && message.member.voiceChannel != undefined && message.guild.member(client.user).voiceChannel.members.size > 1) return message.send(`${message.emote('error')}  Can't stop another channels music. `)
            delete client.queue[message.guild.id];
            const vc = client.voiceEngine.leave(message.guild.id);
            await client.functions['discordBug'](client);
            message.send(`${message.emote('stop')} **Stopped**`)
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}