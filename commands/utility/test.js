const Command = require('../../structures/command.js');
const http = require('https');
const snekfetch = require('snekfetch');
const r = require('rethinkdb');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: [],
            },
            help: {
                name: "test",
                usage: "test <stuff>",
            },
            details: {
                fileName: 'test',
                base: 'test',
                perm: "BOT_OWNER"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue) {};
};
