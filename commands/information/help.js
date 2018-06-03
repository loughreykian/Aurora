const Command = require('../../structures/command.js');
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const helpEmbedImport = require('../../structures/help.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['h', 'commands'],
            },
            help: {
                name: "help",
                description: "Gives info about commands.",
                usage: "help [command]",
                examples: ["help google"]
            },
            details: {
                fileName: "help",
                base: "help",
                perm: "OPEN",
                reqPerms: ['EMBED_LINKS'],
            }
        })
    }
    async execute(client, message, args, level, MAM){
        try {
            const settings = client.config;
            if (!args[0]) {
                const myCommands = message.guild ? client.commands.Filter(cmd => message.permLevel() && cmd.conf.enabled == true) : client.commands.Filter(cmd => message.permLevel() &&  cmd.conf.guildOnly !== true && cmd.conf.enabled == true);
                
                let currentCategory = "";
                let output = "";
                let title = `**Command List (Use \`${settings.prefix}help <commandname>\` for details)**`;
                
                const sorted = myCommands.toArray().sort((p, c) => p.group > c.group ? 1 : p.help.name > c.help.name && p.group === c.group ? 1 : -1 );
                
                sorted.forEach(c => {
                    
                    const cat = c.group.toProperCase();
                    
                    if(currentCategory !== cat) {
                        output += `\n **${cat}**\n`;
                        currentCategory = cat;
                    };
                    
                    output += `\`${settings.prefix}${c.details.base}\` | ${c.help.description}\n`;
                
                });

                message.author.send(`${title}\n${output}\n${message.emote('aurora')} **Join the support server:** ${client.config.serverInvite}\n${message.emote('auroraBETA')} **Add Aurora to your server:** ${client.config.botInvite}`, {split: true}).then(async () => message.send(
                
                message.channel.type === 'dm'
                ? ""
                : `${message.emote('success')} Sent you a DM with information.`))
                .catch(e => { return message.send(`${message.emote('error')} Could not send you a DM. Please turn DMs on if you haven't.`)})   
                
                } else {
                
                let command = args.join(" ").toLowerCase();
                
                if(!client.commands[command] && !client.aliases[command]) return message.send(`${message.emote('error')} Could not find command \`${command}\``);
                
                if (client.commands[command] || client.aliases[command]) {
                
                    if(client.commands[command]) {
                
                        command = client.commands[command]};
                
                    if(client.aliases[command]) {
                
                        let alias = client.commands[client.commands[command]]
                        command = client.aliases[command]
                        command = client.commands[command]
                
                    };
                    
                    const helpEmbed = new helpEmbedImport(command, message);
                    const HE = await helpEmbed.return();

                    message.send({embed: HE})
                }
                }
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        };
    };
};