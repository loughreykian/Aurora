const Discord = require('discord.js');
let botInfoImport = require('../../structures/infoLayoutBot.js');
let serverInfoImport = require('../../structures/infoLayoutServer.js');
let memberInfoImport = require('../../structures/infoLayoutMember.js');
const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
            },
            help: {
                name: "info",
                description: "Gives info about a variety of keywords.",
                usage: "info [server/user]",
                examples: ["info server", 'info papple', 'info 342180964975247383', 'info @Papple']
            },
            details: {
                fileName: 'info',
                base: 'info',
                perm: "EMBED_LINKS",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, level, MAM){
            try {
                if(!args[0]) {
                    try {
                        let bInfo = new botInfoImport(client, message);
                        bInfo.send();
                        return false;
                    } catch (e) {
                        return message.send(`${message.emote('exclamation')} Unable to retrieve bot info.`);
                    }
                } else

                if(args.join(" ").toLowerCase() === 'server'.toLowerCase()) {
                    try {
                        let serverInfo = new serverInfoImport(client, message);
                        serverInfo.send();
                        return false;
                    } catch (e) {
                        return message.send(`${message.emote('exclamation')} Unable to retrieve server info.`);
                    }
                } else {
                    try {
                        let mem = await client.functions['member'](message, args);
                        let noUser = `${message.emote('exclamation')} Could not find member.`;
                        if(mem.reject) return message.send(noUser);
                        let memInfo = new memberInfoImport(client, message, mem);
                        memInfo.send();
                    } catch (e) {
                        return message.send(`${message.emote('exclamation')} Could not find member.`);
                    };
                };
            }  catch (err) {
                message.send(await client.functions['errorMessage'](err, message))
            }

    }
}
