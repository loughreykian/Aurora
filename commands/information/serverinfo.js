const Command = require('../../structures/command.js');
const serverInfo = require('../../structures/infoLayoutServer.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['server', 'sinfo'],
            },
            help: {
                name: "serverinfo",
                description: "Gives info about the current server.",
                usage: "serverinfo",
            },
            details: {
                fileName: 'serverinfo',
                base: 'serverinfo',
                perm: "EMBED_LINKS",
                reqPerms: ['EMBED_LINKS']
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {            
        try {
                try { 
                    const server = new serverInfo(client, message);
                    server.send();
                } catch (e) {
                    return message.send(`${message.emote('exclamation')} Unable to retrieve server info.`);
                }
            }  catch (err) {
               return message.send(await client.functions['errorMessage'](err, message));
            }
    }
};