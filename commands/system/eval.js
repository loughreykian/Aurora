const Command = require('../../structures/command.js');
const r = require('rethinkdb');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['ev'],
            },
            help: {
                name: "eval",
                description: "Evaluates arbitrary JavaScript",
                usage: "ev <code>",
            },
            details: {
                fileName: "eval",
                base: "eval",
                perm: "BOT_OWNER"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue) {            
        try {
            const code = args.join(" ");
            if(!code) return message.send(MAM)
            const evaled = eval(code);
            const clean = await client.functions['clean'](client, evaled);
    
            if(code.length > 2000) return message.send(`${message.emote('error')} Output was too long to display.`);
                message.send(`\`\`\`js\n${clean}\n\`\`\``);
            
        }  catch (err) {
            return message.send(`\`\`\`\n${err}\n\`\`\``);
        };
    };
};
