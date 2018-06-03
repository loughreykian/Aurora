const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: false,
                aliases: ['g'],
            },
            help: {
                name: "google",
                description: "Searches google for a term.",
                usage: "google <search>",
            },
            details: {
                fileName: 'google',
                base: 'google',
                perm: "SEND_MESSAGES"
            }
        })
    }
async execute(client, message, args, MAM, serverQueue) {        
        try {
            const text = args.join(" ");
            if(!args[0]) return message.send(MAM);
            let searchMessage = await message.send(`${message.emote('google')} | Searching...`);
            let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
            return snekfetch.get(searchUrl).then(async result => {
                console.log(result)
                return false;
                let $ = cheerio.load(result.text);
                let googleData = $('.r').first().find('a').first().attr('href');
                googleData = querystring.parse(googleData.replace('/url?', ''));
                let edit = `${message.emote('google')} ${googleData.q}`;
                client.logger.log(edit);
                searchMessage.edit(edit);
            }).catch(async err => {
            searchMessage.edit(`${message.emote('google')} No results found!`);
          });
        }  catch (err) {
            message.send(await client.functions['errorMessage'](err, message))
        }
    }
}