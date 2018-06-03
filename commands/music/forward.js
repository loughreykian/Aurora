const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['ff', 'fastforward']
            },
            help: {
                name: "fast-forward",
                description: "Goes forward a specified time in the current song.",
                usage: "fastforward <time>",
            },
            details: {
                base: "forward",
                reqPerms: ['USE_VAD']
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue) {
        try {

            if(!args[0]) return message.send(MAM);
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')} Get in a voice channel.`); 
            if(!message.guild.serverQueue) return message.send(`${message.emote('error')} No music playing.`);

            let time = parseInt(args.join(" "));

            if(!serverQueue.tracks[0].seekable) return message.send(`${message.emote('error')} Current song is not seekable.`);

            const timeIn = message.client.voiceEngine.get(message.guild.id).state.position;
            if(isNaN(time) || time == 0 || timeIn + (time * 1000) > message.guild.serverQueue.tracks[0].duration) return message.send(`${message.emote('error')} Must be a valid time.`);
            time = Math.round(timeIn + (time * 1000));

            message.client.voiceEngine.get(message.guild.id).seek(time);
            return message.send(`${message.emote('success')} Seeked to position \`${message.ms(time)}\``);
 
        }  catch (err) {
           return message.send(client.functions['errorMessage'](err, message));
        };
    };
};
