const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                permLevel: "Bot Owner"
            },
            help: {
                name: "shutdown",
                description: "Shuts down the bot",
                usage: "shutdown",
            },
            details: {
                fileName: "shutdown",
                base: "shutdown",
                perm: "BOT_OWNER"
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {           
        try {
            let msg = await message.send(`${message.emote('dot')} Shutting down...`);
            setTimeout(function(msg) { 
                msg.edit(`${message.emote('dot')} Shut down.`);
            }, 200);
            setTimeout(process.exit(1), 3000);
        }  catch (err) {
           return message.send(client.functions['errorMessage'](err, message));
        };
    };
};
