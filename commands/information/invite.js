const Command = require('../../structures/command.js');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['server'],
            },
            help: {
                name: "invite",
                description: "Gives information regarding invites.",
                usage: "invite",
            },
            details: {
                fileName: 'invite',
                base: 'invite',
                perm: "SEND_MESSAGES",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            const embed = new Discord.RichEmbed() 
                .setColor(0xffc875)
                .setAuthor('Invite Info')
                .setDescription(`Here's a couple links regarding invites!\n[Invite](${client.config.botInvite}) Aurora to your server!\n[Join](${client.config.serverInvite}) the support server!`)
                .setFooter("Invites")
                .setTimestamp()
            message.send({embed})
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}