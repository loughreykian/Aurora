const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['reboot'],
            },
            help: {
                name: "reload",
                description: "Reloads files.",
                usage: "reload <command/event/filepath>",
            },
            details: {
                fileName: 'reload',
                base: 'reload',
                perm: "BOT_OWNER"
            }
        })
    };

async execute(client, message, args, MAM, serverQueue) {        
        try {
            let name = args.join(" ");
            if (!name) return message.send(MAM);

            let oof = client.functions['reload'](message, name);
            message.send(oof);
        } catch (err) {
            return message.send(await client.functions['errorMessage'](err, message));
        };
    };
};
