const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: false,
                guildOnly: false,
                aliases: [],
            },
            help: {
                name: "load",
                description: "Loads a file.",
                usage: "load <file>",
            },
            details: {
                fileName: "load",
                base: "load",
                perm: "BOT_OWNER"
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {            
            try {
            	let file = args.join(" ");
            	client.functions['loadFile'](message, file);
            } catch (e) {
            	client.functions['errorMessage'](err, message);
            }
    }; 
};
