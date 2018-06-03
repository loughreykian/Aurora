const { stripIndents } = require('common-tags');
const moment = require('moment-timezone');
const os = require('os');
const ms = require('ms');
const Discord = require('discord.js');
const pckg = require('../package.json');

module.exports = class botInfo {
    constructor(client, message) {
        this.client = client;
        this.message = message;
        this._color = message.guild.me.roles.size > 1 ? message.guild.me.colorRole.color : 0x63e4d8;
        this._author1 = `${pckg.name} v${pckg.version}`;
        this._author2 = client.user.avatarURL
        this._thumbnail = client.user.avatarURL;
        this._footer2 = message.author.avatarURL;
    };
// • Swap Size  | ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB

    async send() {
        const embed = new Discord.RichEmbed()
        .setColor(this._color)
        .setAuthor(this._author1, this._author2)
        .setThumbnail(this._thumbnail)
        .setDescription(stripIndents(`
         **Uptime:** ${ms(this.client.uptime)} (since ${moment(this.client.readyAt).tz('America/Denver').format("dddd, MMMM Do YYYY, h:mm:ss a z")})
         **Memory:** ${Math.round(((os.totalmem() - os.freemem()) / 1024 / 1024))}/${Math.round(os.totalmem() / 1024 / 1024)} MB (\`${Math.round((((os.totalmem()) - os.freemem()) * 100) / os.totalmem())}%\`)
         **Stats:** \`${this.client.guilds.size}\` servers | \`${this.client.channels.size}\` channels |\`${this.client.users.size}\` users
        
         **Developed by:** ${this.message.emote('papple')} \`${pckg.author}\`
         **Contributors:** ${this.message.emote('indy')} \`Indy#1010\` & ${this.message.emote('joe')} \`Joe 🎸#7070\`
         **Library:** ${this.message.emote('discordJS')} [Discord.js](https://discord.js.org/#/) v${Discord.version}
         **Process:** ${this.message.emote('nodeJS')} [Node.js](https://nodejs.org/en/) ${process.version}

        \\🔗 [Add Aurora to your server](${this.client.config.botInvite})
        \\📦 [Patreon](https://www.patreon.com/loughreykian) - [PayPal](https://www.paypal.me/keyin) | \\🔖 [Aurora's Borealis](${this.client.config.serverInvite})
        `))
        this.message.send({embed})
    }
};