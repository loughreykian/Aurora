const Command = require('../../structures/command.js');

module.exports = class extends Command {
    constructor(client, filePath, group) {
                super(client, filePath, group, {
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: []
            },
            help: {
                name: "",
                description: "",
                usage: "",
                examples: []
            },
            details: {
                base: "",
                reqPerms: []
            }
        })
    }
    async execute(client, message, args, MAM, serverQueue) {        
        try {
			
			let [title, contents] = args.join(" ").split("|");
   			
   			if(!contents) {
     			[title, contents] = ["Achievement Get!", title];
   			};

   			let rnd = Math.floor((Math.random() * 39) + 1);
   			switch(args.join.toLowerCase()) {
   				case "burn": {
   					rnd = 38;
   				}
   				case "cookie": {
   					rnd = 21;
   				}
   				case "cake": {
   					rnd = 10;
   				}
   			};
   			
   			if(title.length > 22 || contents.length > 22) return message.send(`${message.emote('error')} Content can't be longer than 22 characters.`);
   			
   			let result = await snekfetch.get(`https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`)
    		message.send({files: [{attachment: result.body}]})
        
        }  catch (e) {
           return message.send(client.functions['errorMessage'](err, message));
        };
    };
};