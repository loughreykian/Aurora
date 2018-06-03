const { RichEmbed } = require('discord.js');
const fs = require('fs');
const { stripIndents } = require('common-tags');
const talkedRecently = new Set();
const helpEmbedImport = require('../structures/help.js');

module.exports = async (client, message) => {
try {
    if (message.author.bot) return false;

    //const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let prefix = await message.settings({
        grab: true,
        key: 'prefix'
    });

    if (message.content.indexOf(prefix) != 0) return false;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = await client.fetchCommand(command);
    if (!cmd) return false;

    message.command = cmd;

    const permMessage = `${message.emote('shield')} You do not have permission to use the command \`${cmd.help.name}\`.`
    
    let func = await message.permLevel();
    if(!func) return message.send(permMessage);

    if(!cmd.conf.enabled && message.author.id != client.config.ownerID ) return message.send(`${message.emote('error')} That command is disabled.`);

    if (!message.guild && cmd.conf.guildOnly) return message.send(`${message.emote('exclamation')} Please run this command in a server.`);
    
    if(cmd.group === 'music' && !client.voiceEngine) return message.send(`${message.emote('exclamation')} Voice engine is currently offline.`);

    if(await message.settings({ grab: true, key: 'music-enabled' }) == false && cmd.group === 'music') return message.send(`${message.emote('error')} Music is currently disabled.`);

    //if(await message.settings({ grab: true, key: 'blacklist' }).inlcudes(message.channel.id) && cmd.group === 'music' && !message.author.id == client.config.ownerID && !message.author.id == message.guild.ownerID) return message.send(`${message.emote('error')} This channel is blacklisted from music commands.`);

    if(cmd.details.reqPerms && message.guild) {
        if(!message.channel.permissionsFor(client.user).has(cmd.details.reqPerms, false)) return message.send(`I lack the permissions: \`${cmd.details.reqPerms.map(p => p).join('\`, \`')}\``);
    };

    if (talkedRecently.has(message.author.id)) return message.send(`${message.emote('exclamation')} Woah there buddy.`);
    talkedRecently.add(message.author.id);
    talkedRecently.delete(client.config.ownerID)
    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 1750);

    const serverQueue = message.guild ? client.queue[message.guild.id] : null;
    const helpEmbed = new helpEmbedImport(cmd, message);
    const HE = await helpEmbed.return();

    message.guild.serverQueue = serverQueue;

    const MAM = {embed: HE};

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
        message.flags.push(args.shift().slice(1));
    };

    //Run the command
    const log = `[CMD] ${message.author.username} (${message.author.id}) ran command ${cmd.help.name} in ${message.guild.name}`;
    client.logger.cmd(log);
    client.functions['cmdLog'](message, cmd, log)
    cmd.execute(client, message, args, MAM, serverQueue);
} catch (e) {
    client.logger.error(`Error getting message: ${e.stack}`);
};  
};
