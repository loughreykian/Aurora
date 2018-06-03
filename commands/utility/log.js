const Command = require('../../structures/command.js');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
            },
            help: {
                name: "log",
                description: "Logs something into the console & server logs (Aurora's Borealis)",
                usage: "log [options] <content>",
            },
            details: {
                fileName: 'log',
                base: 'log',
                perm: "BOT_OWNER"
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            let content = args.join(" ");
            if(!content) return message.send(MAM)
            let chan = client.channels.get(client.config.logChan);
            let options;
            client.logger.log(content);
            chan.send(content);
            message.send(`${message.emote('success')} Logged.`)
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}