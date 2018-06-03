const Command = require('../../structures/command.js');
const memberInfo = require('../../structures/infoLayoutMember.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['uinfo'],
            },
            help: {
                name: "userinfo",
                description: "Gives info about a user",
                usage: "userinfo <id/mention/username/nickname>",
                examples: ["userinfo @Papple", 'userinfo papple', 'userinfo 342180964975247383']
            },
            details: {
                fileName: 'userinfo',
                base: 'userinfo',
                perm: "EMBED_LINKS",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {            
        try {
                try {
                    let mem = await client.functions['member'](message, args);
                    let memInfo = new memberInfo(client, message, mem);
                    memInfo.send();
                } catch (e) {
                    return message.send(`${message.emote('exclamation')} Could not find member.`)
                };
            }  catch (err) {
               return message.send(await client.functions['errorMessage'](err, message));
            }
    }
};
