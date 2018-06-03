const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['rmv'],
            },
            help: {
                name: "remove",
                description: "Removes a song from the queue.",
                usage: "remove <song position in queue>",
            },
            details: {
                fileName: 'remove',
                base: 'remove',
                perm: "USE_VAD"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
            try {
            const param0 = Math.round(args[0]);
            const param1 = Math.round(args[1]);
            const params = args.join(" ");
            if(!args[0]) return message.send(MAM);
            if(!serverQueue) return message.send(`${message.emote('error')} No queue to remove songs from`);
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel`);
            const invNum = `${message.emote('error')} Enter a number between \`1\` and \`${serverQueue.tracks.length - 1}\``;
            //if(param0.includes('.')) return message.send(invNum)
            let items = [];
            serverQueue.tracks.forEach(t => items.push(t.title));
            if(items.includes(params)) {
                let t = items.includes(params);
            };
            if(param0 && param1 && !isNaN(param0) &&!isNaN(param1)) {
                const invNum2 = `${message.emote('error')} Range must be in between \`1\` and \`${serverQueue.tracks.length}\``;
                //if(param0.includes('.') || param1.includes('.')) return message.send(invNum2)
                if(param0 == param1 || param0 > serverQueue.tracks.length || param1 > serverQueue.tracks.length || param0 <= 0 || param1 <= 0 || param0 > param1) return message.send(invNum2)
                serverQueue.tracks.splice(param0, param1);
                message.send(`${message.emote('delete')} Removed \`${param1 - param0}\` songs.`)
                return false;
            };
            if(isNaN(param0) || param0 > serverQueue.tracks.length - 1 || param0 <= 0) return message.send(invNum)
            message.send(`${message.emote('delete')} Removed song \`${param0}\`: **${serverQueue.tracks[param0].title}**`)
            serverQueue.tracks.splice(param0, 1)
            return false;
            }  catch (err) {
                return message.send(await client.functions['errorMessage'](err, message));
            }
    }
}
