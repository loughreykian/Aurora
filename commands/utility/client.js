const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['bot'],
            },
            help: {
                name: "client",
                description: "Sets attributes of the bot",
                usage: "client <type> <value>",
                examples: ["client activity 3 YouTube", "client username Papple"]
            },
            details: {
                fileName: 'client',
                base: 'client',
                perm: "BOT_OWNER"
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            const action = args.shift();
            if(!action) return message.send(MAM)
        
            if(action.toLowerCase() === "activity".toLowerCase()) {
            let type = args.shift();
            let activity = args.join(" ");
            if(!type || type > 3 || type < 0) return;
            let configuration;
                if(type == '0') configuration = 'Playing';
                if(type == '1') configuration = 'Streaming';
                if(type == '2') configuration = 'Listening to';    
                if(type == '3') configuration = 'Watching';
            let m_m  = parseInt(type);
            client.user.setActivity(activity, {type: m_m});
            message.send(`${message.emote('success')} | Activity set to: \`${configuration} ${activity}\``);
            } else

            if(action.toLowerCase() === 'username'.toLowerCase()) {
            const username = args.join(" ");
            client.user.setUsername(username)
            message.send(`${message.emote('success')} | Username changed to \`${username}\``)
            } else 

            if(action.toLowerCase() === 'avatar'.toLowerCase()) {
            const avatar = args.join(" ");
            //if(!readdir(`./images/${avatar}.JPG`)) return message.send(`<:auroraFailed:411676358452838412> | Could not find that image.`)
            client.user.setAvatar(`./images/${avatar}`)
            message.send(`${message.emote('success')} | Avatar changed to \`${avatar}\``)
            } else return false;
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}