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
                name: "id",
                description: "Gives the ID of the mentioned user.",
                usage: "id <mention>",
                examples: ["id papple"]
            },
            details: {
                fileName: 'id',
                base: 'id',
                perm: "SEND_MESSAGES"
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            if(!args[0]) return message.send(MAM);
            const target = message.mentions.members.first();
            let yes = false;
            if(target) yes = true
            let m = await client.functions['member'](message, args, yes);            
            message.send(m.user.id);
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message));
        }
    }
}
