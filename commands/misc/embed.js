const Command = require('../../structures/command.js');
const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: [],
            },
            help: {
                name: "embed",
                description: "Puts text into an embed",
                usage: "embed <text>",
            },
            details: {
                fileName: 'embed',
                base: 'embed',
                perm: "EMBED_LINKS",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            if(!args[0]) return message.send(MAM)
            if(message.guild && message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) message.delete();
            const embedColors = colors.colors;
            const randomEmbedColor = embedColors[Math.floor(Math.random() * embedColors.length)];
            const text = args.join(" ");
            if(text.length > 1999) return false;
            const embed = new Discord.RichEmbed()
                .setColor(randomEmbedColor)
                .setDescription(text)
            message.send({embed})
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}