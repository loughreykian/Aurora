const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['dc', 'leave'],
            },
            help: {
                name: "disconnect",
                description: "Disconnects from the current voice channel.",
                usage: "disconnect",
            },
            details: {
                fileName: 'disconnect',
                base: 'disconnect',
                perm: "MANAGE_CHANNELS"
            }
        })
    }
    async execute(client, message, args, level, serverQueue){
        try {
            if(message.guild.member(client.user).voiceChannel == undefined) return message.send(`${message.emote('error')} Not connected `);
            if(message.guild.member(client.user).voiceChannel != message.member.voiceChannel && message.member.voiceChannel != undefined && message.guild.member(client.user).voiceChannel.members.size > 1) return message.send(`${message.emote('error')} Must be in the same voice channel as me. `)
            if(serverQueue) {
                delete client.queue[message.guild.id];
            };
            const vc = client.voiceEngine.leave(message.guild.id);
            await client.functions['discordBug'](client);
            message.send(`${message.emote('eject')} **Disconnected** `);
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}