const Command = require('../../structures/command.js');
const ytapi = require('simple-youtube-api');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['yt'],
            },
            help: {
                name: "youtube",
                description: "Searches youtube for a song",
                usage: "youtube [number (max 10)] <term>",
                examples: ["youtube tesla motors", "youtube 5 tesla motors"]
            },
            details: {
                fileName: 'youtube',
                base: 'youtube',
                perm: "SEND_MESSAGES"
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            if(!args[0]) return message.send(MAM);
            const youtube = new ytapi(client.config.youtubeAPIKey);
            let amount = !isNaN(args[0]) ? args.shift() : 1;
            if(amount > 10 || amount <= 0) return message.send(`${message.emote('error')} Please keep amount between 0 and 10.`)
            let channel = message.channel;
            if(amount > 5) channel = message.author;
            const search = args.join(" ");
            if(!args) return message.send(MAM)
            const results = await youtube.searchVideos(search, amount);
            if(!results[0]) return message.send(`${message.emote('error')} No results.`);
            channel === message.author ? message.send(`${message.emote('success')} | Sent you a DM with the top \`${amount}\` results for the topic \`${search}\``) : null;
            channel.send(`${message.emote('youtube')} Top \`${amount}\` Result(s)\n\n :headphones:${results.map(i => `${i.title}\n:link: \<https://youtube.com/watch?v=${i.id}\>\n`).join("\n:headphones:")}`).catch(async e => { message.send(`${message.emote('error')} Could not send you a DM. Please enable DMs for this server.`)});
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}