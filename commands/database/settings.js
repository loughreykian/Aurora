const Command = require('../../structures/command.js');
const emotefile = new Object(require(`${process.cwd()}/structures/settings.json`));

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['set', 'config'],
            },
            help: {
                name: "settings",
                description: "View or edit a setting.",
                usage: "settings [key] [value]",
                examples: ['settings prefix ;']
            },
            details: {
                fileName: "settings",
                base: "settings",
                perm: "ADMINISTRATOR",
                reqPerms: ["EMBED_LINKS"]
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {
        try {

            var setobj = {
                key: args.shift(),
                value: args.join(" "),
                view: false,
                update: true,
                grab: false,
                reset: false
            };

            if(!setobj.key) return await client.functions['displaySettings'](message);

            if(setobj.key.toLowerCase() === 'reset') {
                let response = await message.awaitreply(`${message.emote('exclamation')} Are you sure you would like to reset the settings? This **can not** be undone. Type \`cancel\` to cancel.`, 10000);
                
                if(['yes', 'yeah', 'yup'].includes(response.text.toLowerCase())) {
                    setobj.reset = true,
                    setobj.key = undefined,
                    setobj.value = undefined,
                    setobj.view = false,
                    setobj.update = false,
                    setobj.grab = false,
                    setobj.reset = true;

                    return message.settings(setobj)

                } else {

                    return message.send(`${message.emote('exclamation')} Cancelling.`)

                };
            };

            if(!setobj.value) {
                setobj.view = true;
                setobj.update = false;
                setobj.value = undefined;
            };

            if(setobj.value != undefined) {
                let check = await client.functions['settingsCheck'](message, setobj);
                if(check) return message.send(check);
            };

            let set = await message.settings(setobj);

        }  catch (err) {
           return message.send(client.functions['errorMessage'](err, message));
        };
    };
};
