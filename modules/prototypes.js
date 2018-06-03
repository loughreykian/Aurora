const { Message, Guild, RichEmbed } = require('discord.js');
const emoteFile = require('../structures/emotes.json');
const r = require('rethinkdb');
let emotefile = new Object(require(`${process.cwd()}/structures/emotes.json`));

module.exports = (client) => {
  Message.prototype.send = function send(content) {
    if (this.guild && !this.channel.permissionsFor(client.user).has("SEND_MESSAGES", false)) {
      try {
        this.author.send(content);
      } catch (e) { return; };
    };
    try {
      return this.channel.send(content);
      return this;
    } catch (e) { return; };
  };

  Message.prototype.emote = function emote(emote, options) {
    try {
      let emojis = new Object(emoteFile);
      if (typeof emote != 'string') return '';
      if (this.guild && !this.channel.permissionsFor(client.user).has("USE_EXTERNAL_EMOJIS", false)) {
        let def = emoteFile['default'][emote];
        if (def) return def;
        return '';
      };
      let cus = emojis['custom'][emote] || '';
      if (cus) return cus;
      let def = emojis['default'][emote] || '';
      if (def) return def;
      if (!cus && !def) return '';
      return `:${emote}:`;
    } catch (e) {
      return this.errorMessage(e, message);
    };
  };

  Message.prototype.ms = function ms(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = parseInt(((ms % 3600000) / 60000).toString().split('.')[0]);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    let output = `${(hours < 10 ? hours ? `0${hours}:` : "" : `${hours}:`)}${(minutes < 10 ? `0${minutes}` : minutes)}:${(seconds < 10 ? '0' : '')+seconds}`;
    return output;
  };

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  Array.prototype.shuffle = function() {
    let j, x, i;
    for (i = this.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this[i];
        this[i] = this[j];
        this[j] = x;
    };

    return this;
  }

  Object.prototype.Filter = function(predicate) {
    let ob = Object.keys(this)
          .filter( key => predicate(this[key]) )
          .reduce( (res, key) => (res[key] = this[key], res), {} );
    return ob;
  };

  Object.prototype.toArray = function() {
    return Object.keys(this).map(key => this[key]);
  };

  Message.prototype.settings = function(options = {}) {
    return client.functions['settings'](this, options);
  };

  Message.prototype.perms = function(options = {}) {
    return client.functions['perms'](this, options);
  };

  Message.prototype.permLevel = function() {
    return client.functions['permLevel'](this);
  };

  Message.prototype.awaitreply = async function(question, limit = 60000) {
    
    const filter = m => this.author.id === this.author.id;
    let msg = await this.channel.send(question);
    try {

      const collected = await this.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"]
      });

      //if(collected.errors[0]) msg.edit(`${this.emote('success')} Cancelled.`);
  
      let obj = {
        text: collected.first().content,
        message: msg
      };

      return obj;
    
    } catch (e) {
      return false;
    };
  }
};