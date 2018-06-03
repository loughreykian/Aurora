const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['pong'],
            },
            help: {
                name: "ping",
                description: "Gives the ping of the bot.",
                usage: "ping",
            },
            details: {
                fileName: 'ping',
                base: 'ping',
                perm: "SEND_MESSAGES"
            }
        })
    };

    async execute(client, message) {
        try {
            let ping = await message.send(`${message.emote('dot')} Ping?`);
            ping.edit(`${message.emote('success')} Pong! \`${ping.createdTimestamp - message.createdTimestamp}ms\`.`);
        } catch (err) {
            message.send(client.functions['errorMessage'](err, message));
        }
    };
};
