const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: false,
                guildOnly: true,
                aliases: ['mbl', 'memberblacklist', 'memberbl'],
            },
            help: {
                name: "memberblacklist",
                description: "Blacklists a member from using commands.",
                usage: "memberblacklist [memberid]",
            },
            details: {
                base: 'memberblacklist',
                perm: "BOT_OWNER",
                reqPerms: ["EMBED_LINKS"],
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {

            return false;
            
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}