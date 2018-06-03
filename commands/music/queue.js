const Command = require('../../structures/command.js');
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const snekfetch = require('snekfetch');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['q'],
            },
            help: {
                name: "queue",
                description: "Displays the current queue.",
                usage: "queue [pagenumber]",
            },
            details: {
                fileName: 'queue',
                base: 'queue',
                perm: "EMBED_LINKS",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!serverQueue || !serverQueue.tracks[1]) return message.send(`${message.emote('error')}  No queue `);
            var page = args[0];
            let queueLength = Math.ceil(serverQueue.tracks.length / 10);
            const errorMessage = `${message.emote('error')} |  Queue page must be in between 1 and ${queueLength} `
            if(page && isNaN(page)) return message.send(errorMessage);
            if(page > queueLength || 0 >= page) return message.send(errorMessage);
            let index = 0;
            if(!page || page == 1) {
                index = 0;
                var page = 1;
                var amount1 = 1;
                var amount2 = 10;
            } else {
                index = (page - 1) * 10 -1;
                var amount1 = (page - 1) * 10;
                var amount2 = page * 10;
            };
            var dur = 0;
            for(let i = 0; i < serverQueue.tracks.length - 1; i++) {
                dur += serverQueue.tracks[i + 1].duration
            };
            let titleLink = `https://www.youtube.com/watch_videos?video_ids=${serverQueue.tracks.map(t => t.id).join(",")}`;
            const gapi = await snekfetch.post(`https://www.googleapis.com/urlshortener/v1/url?key=${client.config.googleAPIKey}`).send({"longUrl":titleLink}).catch(e => { message.send(`${message.emote('exclamation')} Error getting queue.`) });
            if(!gapi.body || gapi.body.error) return message.send(`${message.emote('exclamation')} Error getting queue.`);
            let desc = `**Now playing:** [${serverQueue.tracks[0].title}](${serverQueue.tracks[0].url})\n**Duration:** \`${message.ms(serverQueue.tracks[0].duration)}\` | **Artist:** ${serverQueue.tracks[0].artist}\n\n`;
            desc += serverQueue.tracks.slice(amount1, amount2).map(track => `**${++index}** - [${track.title}](${track.url}) (\`${message.ms(track.duration)}\`)`).join("\n");
            const embed = new Discord.RichEmbed()
            .setColor(0x76adc3)
            .setTitle(`${message.emote('list')} Queue for ${message.guild.name}`)
            .setDescription(desc)
            .setFooter(`Page ${page} of ${queueLength} | ${serverQueue.tracks.length - 1} songs, ${message.ms(dur)} total`)
            .setURL(gapi.body.id)
            .setTimestamp()
            message.send({embed})
            return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}
