const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['s'],
            },
            help: {
                name: "skip",
                description: "Skips the current song.",
                usage: "skip",
            },
            details: {
                fileName: 'skip',
                base: 'skip',
                perm: "USE_VAD"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')}  Get in a voice channel `);
            if(!serverQueue) return message.send(`${message.emote('error')}  No music playing `);
            if(message.guild.member(client.user).voiceChannel != message.member.voiceChannel && message.member.voiceChannel != undefined && message.guild.member(client.user).voiceChannel.members.size > 1) return message.send(`${message.emote('error')}  Can't skip another channels music. `)
            client.voiceEngine.get(message.guild.id).disconnect();
            message.send(`${message.emote('skip')} **Skipped**`);
            return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}