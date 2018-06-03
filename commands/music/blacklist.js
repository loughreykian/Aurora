const Command = require('../../structures/command.js');
const Discord = require('discord.js');
const r = require('rethinkdb');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: false,
                guildOnly: true,
                aliases: ['bl'],
            },
            help: {
                name: "blacklist",
                description: "Blacklist a channel from using music commands.",
                usage: "blacklist [channel name/mention/id]",
                examples: ['blacklist general', 'blacklist #testing', 'blacklist 398674146982363136']
            },
            details: {
                fileName: "blacklist",
                base: "blacklist",
                perm: "MANAGE_CHANNELS",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, MAM) {
        try {

            if(!args[0]) return message.send(MAM);

            let ifRemove = args[1] ? args.shift() : null;

            let name = args.join(" ");

            if(name.toLowerCase() === 'reset') {

                let chans = await r.table('guilds').get(message.guild.id).update({ blChan: [] }).run(client.dbConnection);    

                return message.send(`${message.emote('success')} Blacklist reset.`);

            };

            let check = function() {

                if(message.guild.channels.get(name)) return message.guild.channels.get(name);

                if(message.mentions.channels.first()) return message.mentions.channels.first();

                let chan = message.guild.channels.find(c => c.name.toLowerCase().startsWith(name));

                if(chan) return chan;

                return false;

            };

            let settings = await message.settings({ grab: true, key: 'blacklist' });

            if(!settings) return message.send(`${message.emote('thinking')} Odd, the blacklist-channel setting doesn't seem to exist.`);

            if(ifRemove === 'remove') {
                
                if(settings.includes(check().id)) {

                    let array = settings.splice(settings.findIndex(id => id == check().id), 1)

                    let table = await r.table('guilds').get(message.guild.id).update({ blChan: array}).run(client.dbConnection);

                    message.send(`${message.emote('success')} Removed channel \`${check().name}\` from the blacklist.`);

                    return false;

                };

            };

            if(check() == false) return message.send(`${message.emote('error')} Enter a valid channel id, name, or mention.`);

            if(settings.includes(check().id)) return message.send(`${message.emote('error')} That channel is already in the blacklist.`);

            var array = [];

            let setting = function() {

                if(settings[0]) {

                    array = [check().id];

                    array = array.concat(settings);

                } else {

                    array = [check().id];

                };

            };

            setting();

            let table = await r.table('guilds').get(message.guild.id).update({ blChan: array }).run(client.dbConnection);

            message.send(`${message.emote('success')} Channel \`${check().name}\` added to blacklist.`);
        
            return false;
        
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        };
    };
};