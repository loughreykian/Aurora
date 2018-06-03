const r = require('rethinkdb');
const emotefile = new Object(require(`${process.cwd()}/structures/settings.json`));

module.exports = function(message, options) {
    try {

        if(!options.key) return `${message.emote('error')} Please provide a key to edit.`;

        if(!emotefile['names'][options.key.toLowerCase()]) return `${message.emote('error')} That key does not exist.`;

        if(options.key.toLowerCase() === 'prefix') {
            if(key.length <= 0) return `${message.emote('error')} Prefix must be over 0 characters.`;   
        } else 

        if(options.key.toLowerCase() === 'dj-role') {
            let role = message.guild.roles.find(r => r.name.toLowerCase().startsWith(options.value.toLowerCase()));
            if(!role) return `${message.emote('error')} That role does not exist.`            
        } else

        if(['announce-songs', 'prevent-duplicates', 'music-enabled'].includes(options.key.toLowerCase())) {
            if(!['true', true, 'false', false, 'enable', 'disable'].includes(options.value.toLowerCase())) return `${message.emote('error')} Value must be \`true\`, \`false\`, \`enable\` or \`disable\`.`;       
        } else {
            return `${message.emote('error')} That key does not exist.`;
        };

    } catch (e) {
        return options = undefined;
    };
};