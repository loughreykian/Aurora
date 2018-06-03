const { stripIndents } = require('common-tags');
const Discord = require('discord.js');
const emoteFile = require('../structures/emotes.json');
const obj = new Object(emoteFile);
const miscFile = require('../structures/misc.json');
const obj2 = new Object(miscFile);
const moment = require('moment-timezone');

module.exports = class serverInfo {
    constructor(client, message) {
        this.client = client;
        this.message = message;
        this._color = 0x63e4d8;
        this._author1 = message.guild.name;
        this._icon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`;
        this._footer1 = `ID: ${message.guild.id}`;
        this._field1Title = 'Extra Info';
        this._field1 = stripIndents(`
            📁 \`${message.guild.channels.size}\` channels (\`${message.guild.channels.filter(t => t.type === 'voice').size}\` voice) | \`${message.guild.roles.size}\` roles | 🙂 \`${message.guild.emojis.size}\` emojis
        `) 
        };

    async send() {
        const embed = new Discord.RichEmbed() 
        .setColor(this._color)
        .setThumbnail(this._icon)
        .setAuthor(this._author1, this._icon)
        .setDescription(stripIndents(`
            \`${this.message.guild.memberCount}\` members | ${obj['status']['emotes']['online']} \`${this.message.guild.members.filter((member) => ['online', 'idle', 'dnd'].includes(member.user.presence.status)).size}\` online | \\🤖 \`${this.message.guild.members.filter(m => m.user.bot).size}\` bots
            ${this.message.emote('owner')} **Owner:** ${this.message.guild.owner.user.tag}
            ⏰ **Created:** ${moment(this.message.guild.createdAt).tz('America/Denver').format("dddd, MMMM Do YYYY, h:mm:ss a z")}
            🗺 **Region:**  \`${this.message.guild.region.toUpperCase()}\`
            🔐 **Security:**  \`${obj2['security'][this.message.guild.verificationLevel].toProperCase()}\`
        `)
        )
        .addField(this._field1Title, this._field1)
        .setFooter(this._footer1)
        .setTimestamp()
        this.message.send({embed})
    }
};