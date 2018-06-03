const Command = require('../../structures/command.js');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: [],
            },
            help: {
                name: "code",
                description: "Puts some code into a code block.",
                usage: "code <language> <code>",
                examples: ["code js console.log('test')"]
            },
            details: {
                fileName: 'code',
                base: 'code',
                perm: "SEND_MESSAGES"
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            if(!args[0]) return message.send(MAM);
            if(args.join(' ').length > 1999) return false;
            if(message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES", false) && message.guild) { message.delete() };
            message.send(`\`\`\`${args.shift()}\n${Discord.escapeMarkdown(args.join(' '))}\n\`\`\``)
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}