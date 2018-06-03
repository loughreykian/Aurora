const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['b'],
            },
            help: {
                name: "bound",
                description: "Bound the serverqueues text or voice channels.",
                usage: "bound [text/voice] [channel]",
                examples: ["bound music-commands"]
            },
            details: {
                fileName: 'bound',
                base: 'bound',
                perm: "MANAGE_MESSAGES"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!serverQueue) return message.send(`${message.emote('error')}  No music playing to display bound channels `);
            //if(!args.join(" ")) return message.send(`${message.emote('bubble')}  Current bound channels are *\`${serverQueue.textChannel.name}\`(Text)*  and  *\`${serverQueue.voiceChannel.name}\`(Voice) *`);
            if(!args.join(" ")) return message.send(`${message.emote('bubble')}  Current bound channel is \`${serverQueue.textChannel.name}\` `);

            if(!args[0]) return message.send(`${message.emote('error')}  Enter the name of a text channel `);
            let text = message.mentions.channels ? message.mentions.channels.first() : message.guild.channels.filter(c => c.type === 'text').find(c => c.name.toLowerCase().startsWith(args.join(" ").toLowerCase()));
            if(!text) return message.send(`${message.emote('error')} Could not find text channel ${args[1]} `);
            if(text.id == serverQueue.channel.text.id) return message.send(`${message.emote('error')} Current bound channel is already \`${serverQueue.channel.text.name}\``);
            if(!text.permissionsFor(client.user).has("SEND_MESSAGES", false)) return message.send(`${message.emote('error')} I don't have permission to talk there.`)
            serverQueue.channel.text = text;
            message.send(`${message.emote('success')}  Bound text channel set to \`${serverQueue.channel.text.name}\` `)
            return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}