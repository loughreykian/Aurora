const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['join', 'summon'],
            },
            help: {
                name: "connect",
                description: "Connects to the current voice channel.",
                realUsage: "connect",
            },
            details: {
                fileName: 'connect',
                base: 'connect',
                perm: "CONNECT",
                reqPerms: ['CONNECT']
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            const voiceChannel = message.member.voiceChannel;
            if(!voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel `)
            if(!voiceChannel.joinable) return message.send(`${message.emote('error')} Unable to join that channel `);
            if(client.voiceEngine.get(message.guild.id) != undefined) {
            if(message.guild.member(client.user).voiceChannel != message.member.voiceChannel && message.member.voiceChannel != undefined && message.guild.member(client.user).voiceChannel.members.size > 1) return message.send(`${message.emote('error')}  Currently connected to another voice channel `)
            }
            if(message.guild.member(client.user).voiceChannel == message.member.voiceChannel) return message.send(`${message.emote('error')} Already in your voice channel `)
            client.functions['joinChan'](message, voiceChannel);
            message.send(`${message.emote('success')} **Connected** `);
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}
