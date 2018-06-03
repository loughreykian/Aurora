const Command = require('../../structures/command.js');
const { RichEmbed } = require('discord.js');
const controlClass = require('../../modules/board.js')

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['controls', 'controlboard', 'cb'],
            },
            help: {
                name: "controlboard",
                description: "Gives a controlboard for music.",
                usage: "controlboard",
                realUsage: "controlboard",
            },
            details: {
                fileName: "board",
                base: "controlboard",
                perm: "DONATOR",
                reqPerms: ['EMBED_LINKS', 'ADD_REACTIONS'],
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
        
            if(!serverQueue) return message.send(`${message.emote('error')} No music playing.`);
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel.`);
            
            const CBEmbedColor = 0xfc5084;
            
            const controlBoard = new controlClass(message, CBEmbedColor)
            
            let board = await controlBoard.start();
        
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}