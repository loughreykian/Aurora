const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
        super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
            },
            help: {
                name: "perms",
                description: "Set and view permissions.",
                usage: "perms [key] [value]"
            },
            details: {
                fileName: "perms",
                base: "perms",
                perm: "ADMINISTRATOR"
            }
        });
    };
    async execute(client, message, args, MAM, serverQueue) {        
        try {

            if(!args[0]) return message.send(MAM);

            var permobj = {
                key: args.shift().toLowerCase(),
                value: args.join(" "),
                grab: false,
                view: false,
                update: true,
                reset: false,
                delete: false,
                command: false,
                group: false
            };

            if(permobj.key === 'reset') {
                let response = await message.awaitreply(`${message.emote('exclamation')} Are you sure you would like to reset permissions? This **can not** be undone. Type \`cancel\` to cancel.`, 10000);
                
                if(['yes', 'yeah', 'yup'].includes(response.text.toLowerCase())) {
                    permobj.key = undefined,
                    permobj.value = undefined,
                    permobj.view = false,
                    permobj.update = false,
                    permobj.grab = false,
                    permobj.reset = true;

                    return message.perms(permobj)

                } else {

                    return message.send(`${message.emote('exclamation')} Cancelling.`)

                };
            };

            if(!permobj.value) {
                permobj.view = true;
                permobj.update = false;
                permobj.value = false;
            };

            message.perms(permobj);
                
        }  catch (err) {
           return message.send(client.functions['errorMessage'](err, message));
        };
    };
};
