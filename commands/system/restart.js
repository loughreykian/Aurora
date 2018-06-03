const Command = require('../../structures/command.js');
const r = require('rethinkdb');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
            },
            help: {
                name: "restart",
                description: "Restarts the bot.",
                usage: "restart",
            },
            details: {
                fileName: "restart",
                base: "restart",
                perm: "BOT_OWNER",
                reqPerms: []
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {            
        try {
                client.functions['restart'](message);
                let msg = await message.send(`${message.emote('dot')} Restarting...`);
                setTimeout( function() { 
                    msg.edit(`${message.emote('success')} Restarted.`);
                }, 1500);
                return false;
            }  catch (err) {
               return message.send(client.functions['errorMessage'](err, message));
            };
    };
};
