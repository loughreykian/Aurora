const Command = require('../../structures/command.js');
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const nowplayingClass = require('../../modules/refresh.js')

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['np'],
            },
            help: {
                name: "nowplaying",
                description: "Gives current info on the song playing.",
                usage: "nowplaying",
            },
            details: {
                fileName: "nowplaying",
                base: 'nowplaying',
                perm: "EMBED_LINKS",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!serverQueue) return message.send(`${message.emote('error')}  No music playing to display info. `);
            const embed = await client.functions['nowplaying'](message, serverQueue);
           /* if(message.channel.permissionsFor(client.user).has("ADD_REACTIONS", false) && args[0].toLowerCase() === 'refresh' && message.author.id == client.config.ownerID) {
                const npRefresh = new nowplayingClass(client, message, [npEmbed], 0xff7474);
                npRefresh.start();
            } else {*/
            message.send({embed})
            return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}
