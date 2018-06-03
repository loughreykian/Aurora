const { stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');
let emoteFile = require('../structures/emotes.json');
const moment = require('moment-timezone');

let obj = new Object(emoteFile);
module.exports = class memberInfo {
    constructor(client, message, member) {
        this.client = client;
        this.message = message;
        this.member = member;
        this._color = member.roles.size > 1 ? member.colorRole.color : 0xbeb4ad;
        this._thumbnail = member.user.avatarURL;
        this._author1 = `${member.user.tag} ${member.nickname ? `AKA ${member.nickname}` : ''} ${member.user.bot ? '[🤖]' : ''}`;
        this._author2 = member.user.avatarURL;
        this._description = stripIndents(`
            ${member.user.presence.game ? `${member.user.presence.game.streaming ? obj['status']['emotes']['streaming'] : obj['status']['emotes'][member.user.presence.status]}` : obj['status']['emotes'][member.user.presence.status]} ${member.user.presence.game ? (member.user.presence.game.streaming ? `${obj['status']['types']['1'].toProperCase()}` : `${obj['status']['types'][member.user.presence.game.type].toProperCase()}` ) : member.user.presence.status.toProperCase()} ${member.user.presence.game ? `**${member.user.presence.game.name}**` : ""}
            \u0020
            🗞 **Joined:**  ${moment(member.joinedAt).tz('America/Denver').format("dddd, MMMM Do YYYY, h:mm:ss a z")}
            📆 **Registered:**  ${member.user.createdAt}
            \u0020
            ${member.roles.filter(r => r.position > 1).size > 1 ? ` Roles:  ${member.roles.filter(r => r.position > 0).sort((a, b) => b.position - a.position).map(r => r).join(", ")}` : '**No Roles**'}`);
        this._footer1 = `ID: ${member.id}`;
        this._footer2 = message.author.avatarURL;
    }

    send() {
        const embed = new RichEmbed()
        .setColor(this._color)
        .setThumbnail(this._thumbnail)
        .setAuthor(this._author1, this._author2)
        .setDescription(this._description)
        .setFooter(this._footer1)
        .setTimestamp()
        this.message.send({embed})
    }
}