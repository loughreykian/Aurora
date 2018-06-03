const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: false,
                guildOnly: true,
                aliases: [],
            },
            help: {
                name: "level",
                description: "Gives your current permission level.",
                usage: "level",
            },
            details: {
                fileName: 'level',
                base: 'level',
                perm: "SEND_MESSAGES"
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        };
    };
};