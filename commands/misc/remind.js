const Command = require('../../structures/command.js');
const ms = require('ms');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['rmd', 'remindme'],
            },
            help: {
                name: "remind",
                description: "Set a reminder.",
                usage: "remind <time> <reminder>",
                examples: ["remind 10m go eat lunch", 'remind 1h go to sleep']
            },
            details: {
                fileName: 'remind',
                base: 'remind',
                perm: "SEND_MESSAGES",
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            if(!args[0] || !args[1]) return message.send(MAM);
            const time = args.shift();
            const reminder = args.join(' ');
            message.send(`${message.emote('success')} |  I will remind you about that in ${ms(ms(time), {long: true})} `);
            setTimeout(function() {
                message.author.send(`:bell: | ${reminder}`);
            }, ms(time))
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}