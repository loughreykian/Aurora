const Command = require('../../structures/command.js');
const botInfoImport = require('../../structures/infoLayoutBot.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['botinfo', 'binfo'],
            },
            help: {
                name: "botinfo",
                description: "Provides info about the bot",
                usage: "botinfo",
            },
            details: {
                fileName: "botinfo",
                base: "botinfo",
                perm: "EMEBD_LINKS",
                reqPerms: ['EMBED_LINKS']
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {            
        try {
              try {
                const botInfo = new botInfoImport(client, message);
                botInfo.send();
              } catch (e) {
                message.send(`${message.emote('exclamation')} Could not retrieve bot info.`)
              }
            }  catch (err) {
               return message.send(client.functions['errorMessage'](err, message));
            }
    }
};
