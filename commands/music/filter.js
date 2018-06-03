const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: false,
                guildOnly: true,
                aliases: [],
            },
            help: {
                name: "filter",
                description: "Removes songs requested by people no longer in the voice channel.",
                usage: "filter",
            },
            details: {
                fileName: 'filter',
                base: 'filter',
                perm: "MANAGE_MESSAGES"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!serverQueue) return message.send(`${message.emote('dot')}  No queue to filter `);
            console.log(serverQueue.tracks.filter(song => !song.requester.voiceChannel).length);
            serverQueue.tracks.filter(song => !song.requester.voiceChannel);
            message.send(`${message.emote('success')} Queue filtered`);
            return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}