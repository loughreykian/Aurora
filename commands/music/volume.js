const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['vol', 'v'],
            },
            help: {
                name: "volume",
                description: "Sets the volume for the current playback.",
                usage: "volume [number 1-200]",
            },
            details: {
                fileName: 'volume',
                base: 'volume',
                perm: "DONATOR"
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue){
        try {
            if(!message.member.voiceChannel) return message.send(`${message.emote('error')}  Get in a voice channel `);
            if(!serverQueue) return message.send(`${message.emote('error')}  No music playing `)
            let vol = args.join(' ');
            if(vol.includes('%')) vol = vol.split('%')[0].replace(/\s/g,'');
            let volumeEmoji = message.emote('volMed');
        
            if(!vol) return message.send(`${volumeEmoji} | Current volume is set at ${serverQueue.volume}% `);
            if(vol == serverQueue.volume * 50) return message.send(`${message.emote('error')}  Current volume is already at ${vol}% `);
            if(vol < 0 || vol > 100 || isNaN(vol) || vol.length > 3) return message.send(`${message.emote('error')} Volume must be a value between 0 and 100`);
        
            message.send(`${message.emote('volMed')}  Setting volume to ${vol}% `).then(message => {
                serverQueue.volume = vol;
                client.voiceEngine.get(message.guild.id).volume(vol * 4)
                message.edit(`${volumeEmoji} | Volume set to ${vol}%`)
            });
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}