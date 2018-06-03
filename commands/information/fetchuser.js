const Command = require('../../structures/command.js');
const { stripIndents } = require('common-tags');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['user'],
            },
            help: {
                name: "fetchuser",
                description: "Fetch a user from any server.",
                usage: "fetchuser <id>",
                examples: ["fetchuser 342180964975247383"]
            },
            details: {
                fileName: 'fetchuser',
                base: 'fetchuser',
                perm: "EMBED_LINKS",
                reqPerms: ['EMBED_LINKS'],                
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {            
        try {
                if(isNaN(args.join(" ")) || args.join(" ").length != 18) return message.send(`${message.emote('error')} Enter an ID.`);
                try {
                    const target = await client.fetchUser(args.join(" "));
                    const userInfoEmbed = new Discord.RichEmbed()
                        .setColor(0x63e4d8)
                        .setAuthor(`${target.tag} ${target.bot ? '[BOT]' : ''} (${target.id})`, target.avatarURL)
                        .setThumbnail(target.avatarURL)
                        .setDescription(stripIndents(`
                            Created at: ${target.createdAt}
                        `))
                        .setFooter(`Requested By ${message.author.username}`, message.author.avatarURL)
                        .setTimestamp()
                    return message.send({embed: userInfoEmbed});
                } catch (e) {
                    return message.send(`${message.emote('exclamation')}  Could not find member. `);
                };
            }  catch (err) {
                message.send(await client.functions['errorMessage'](err, message))
            };
    };
};