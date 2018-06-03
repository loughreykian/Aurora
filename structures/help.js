const { stripIndents } = require('common-tags');
const Discord = require('discord.js');

module.exports = class mam {
    constructor(command, message) {
        this.command = command;
        this.message = message;
        this._embedColor = 0xfff68f;
        this._embedFooter = '<required>, [optional]';
    };

    async return() {
        const embed = new Discord.RichEmbed()
        .setColor(this._embedColor)
        .setTitle(`${await this.message.settings({ grab: true, key: 'prefix'})}${this.command.details.base} ${this.command.conf.guildOnly ? '(guild-only command)' : ''}`)
        .setDescription(stripIndents(`
            ${this.command.help.description ? this.command.help.description : ''}
            \u0020
            **Category:** ${this.command.group}
            **Usage:** ${await this.message.settings({ grab: true, key: 'prefix'})}${this.command.help.usage}
            ${this.command.help.examples[0] ? `**Example(s):** \`${this.command.help.examples.map(e => e).join('\`, \`')}\`` : ''}
        `))
        .setFooter(this._embedFooter)
        return embed;
    };
};