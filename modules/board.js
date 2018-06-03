const { RichEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const sessions = new Set();

module.exports = class ControlBoard {
    constructor(message, color) {
        this.message = message;
        this.reactor = message.author;
        this.serverQueue = message.client.queue[message.guild.id];
        this.sentmessage = null;
        this.embedTitle = 'Control Board';
        this.embedAuthor = 'https://cdn.discordapp.com/emojis/417222085870616576.png?v=1';
        this.pageColor = color;
        this.enabled = false;
        this.startEmotes = {
            end: '❌',
            refresh: '🔄',
            controls: '🎛',
        }
        this.emojis = {
            end: '❌',
            refresh: '🔄',
            playPause: '⏯',
            stop: '⏹',
            skip: '⏭',
            controls: '🎛'
        };
        this.playbackEmotes = {
            playPause: '⏯',
            stop: '⏹',
            skip: '⏭',
        };
        this.soundEmotes = {};
    };

    async start() {
    try {

        if(sessions.has(this.message.id)) return false;

        if(!this.enabled) {
            await this.init();
        };

        this.message.client.on('messageReactionAdd', async (reaction, user) => {

            if(sessions.has(this.message.id)) return false;

            if(user.id == this.message.client.user.id) return false;
            if(user.id != this.message.author.id) return false;

            //End
            if(reaction.emoji.name == this.emojis['end'] && user.id === this.reactor.id) {
                this.end(user);
                if(this.message.guild.member(this.message.client.user).hasPermission("MANAGE_MESSAGES")) {
                    reaction.remove(user.id);
                    reaction.remove(this.message.client.user.id);
                };
            };

            //Call playback controls
            if(reaction.emoji.name == this.emojis['controls'] && user.id === this.reactor.id) {
                this.reactPlayback();
                if(this.message.guild.member(this.message.client.user).hasPermission("MANAGE_MESSAGES")) {
                    reaction.remove(user.id);
                    reaction.remove(this.message.client.user.id);
                };
            };

            //Call sound controls
            /*if(reaction.emoji.name == this.emojis[1] && user.id === this.reactor.id) {
                this.reactSound();
                reaction.remove(user.id);
                reaction.remove(client.user.id)
            }*/

            //Refresh
            if(reaction.emoji.name === this.emojis['refresh'] && user.id === this.reactor.id) {
                this.refresh(user)
                if(this.message.guild.member(this.message.client.user).hasPermission("MANAGE_MESSAGES")) {
                    reaction.remove(user.id);
                };
            };

            //Playback
            if(reaction.emoji.name === this.emojis['playPause'] && user.id === this.reactor.id) {
                this.playPause(user)
                if(this.message.guild.member(this.message.client.user).hasPermission("MANAGE_MESSAGES")) {
                    reaction.remove(user.id);
                };
            };

            if(reaction.emoji.name === this.emojis['skip'] && user.id === this.reactor.id) {
                this.skip(user)
                if(this.message.guild.member(this.message.client.user).hasPermission("MANAGE_MESSAGES")) {
                    reaction.remove(user.id);
                };
            };

            if(reaction.emoji.name === this.emojis['stop'] && user.id === this.reactor.id) {
                this.stop(user)
                if(this.message.guild.member(this.message.client.user).hasPermission("MANAGE_MESSAGES")) {
                    reaction.remove(user.id);
                };
            };

            //Audio
            /*if(reaction.emoji.name === this.soundontrols[1] && user.id === this.reactor.id) {
                this.volMute(user)
                reaction.remove(user.id);
            }

            if(reaction.emoji.name === this.soundControls[2] && user.id === this.reactor.id) {
                this.volDown(user)
                reaction.remove(user.id);
            }

            if(reaction.emoji.name === this.soundControls[3] && user.id === this.reactor.id) {
                this.volUp(user);
                reaction.remove(user.id);
            }*/
        });
    } catch (e) {
        return this.message.send(`${this.message.emote('error')} Error starting controlboard.`);
    };
    };

    async init() {
        try {

            this.enabled = true;
            this.sentmessage = await this.message.send({embed: this.message.client.functions['nowplaying'](this.message, this.serverQueue)});

            this.startEmotes.toArray().forEach(async emoji => {
                await this.sentmessage.react(emoji);
            });

            let msg = this.sentmessage;
            let Client = this.message.client;
            let Message = this.message;
            let ServerQueue = this.serverQueue;
            
            function editIT() {

                if(sessions.has(Message.id)) clearInterval();
                
                let m = msg.edit({embed: Client.functions['nowplaying'](Message, ServerQueue)});
                
                if(!m) sessions.add(Message.id);
            
            };

            setInterval(editIT, 5000);

        } catch (e) {
            console.log(e)
            return false;
        };
    };

    async reactPlayback() {
        try {

            this.playbackEmotes.toArray().forEach(async emoji => {
                await this.sentmessage.react(emoji)
            })

        } catch (e) {
            return false;
        };
    };

    async reactSound() {
        try {

            this.soundEmotes.toArray().forEach(async emoji => {
                await this.sentmessage.react(emoji)
            });
        
        } catch (e) {
            return false;
        };
    };

    async refresh(user) {
        try {
            
            if(!this.message.member.voiceChannel) return false;
            if(!this.serverQueue) return false;
            this.sentmessage.edit({embed: this.message.client.functions['nowplaying'](this.message, this.serverQueue)})
        
        } catch (e) {
            return false;
        };
    };
    
    async playPause(user) {
        try {
        
            if(!this.message.member.voiceChannel) return false;
            if(!this.serverQueue) return false;
            let type = false;
            if(this.serverQueue.playback) type = true;
            this.serverQueue.playback = type == true ? false : true;

            this.message.client.voiceEngine.get(this.message.guild.id).pause(type);
            this.sentmessage.edit({embed: this.message.client.functions['nowplaying'](this.message, this.serverQueue)})
        
        } catch (e) {
            console.log(e)
            return false;
        };
    };

    async skip(user) {
        try {
        
            if(!this.message.member.voiceChannel) return false;
            if(!this.serverQueue) return false;
            this.message.client.voiceEngine.get(this.message.guild.id).disconnect();
            setTimeout(this.sentmessage.edit({embed: this.message.client.functions['nowplaying'](this.message, this.serverQueue)}), 1500);
        
        } catch (e) {
            return false;
        };
    };

    async stop(user) {
        try {

            if(!this.message.member.voiceChannel) return false;
            if(!this.serverQueue) return false;
            if(this.serverQueue) delete this.message.client.queue[this.message.guild.id];
            this.message.client.voiceEngine.leave(this.message.guild.id);
            let cb = await this.end(user);

        } catch (e) {
            console.log(e)
            return false;
        };
    };

    async end(user) {
        try {
          
            this.enabled = false;
            this.sentmessage.edit({embed: {
                title: `Controlboard`,
                description: `Session ended by **${user.tag}**\nUse \`${await this.message.settings({ grab: true, key: 'prefix'})}controlboard\` to start another session.`
            }});

            //this.message.client.voiceEngine.leave(this.message.guild.id);

            sessions.add(this.message.id);

            if(this.message.guild.member(this.message.client.user).permission.has("MANAGE_MESSAGES")) {
                this.sentmessage.clearReactions();
            };
        
        } catch (e) {
            return false;
        };
    };
};