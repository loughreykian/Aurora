const { RichEmbed } = require('discord.js');
module.exports = class npRefresh {
    constructor(client, message, embed=[], color) {
        this.client = client;
        this.message = message;
        this.guild = message.guild;
        this.reactor = message.author;
        this.npmessage = null;
        this.embedAuthor = 'https://cdn.discordapp.com/emojis/410589457457348622.png?v=1';
        this.embedTitle = 'Music Status'
        this.pages = embed;
        this.pageColor = color;
        this.currentPage = 0;
        this.enabled = false;
        this.emoji = [`:auroraRefresh:411677407171313685`, ':auroraForbidden:418889618113691659'];
        this.emojiName = ['auroraRefresh', 'auroraForbidden'];
    }
    async start() {
        if(!this.enabled) {
            await this.switchPage(0);
        }
        this.client.on('messageReactionAdd', async (reaction, user) => {
            if(user.id == this.client.user.id) return; //Ignores the client
            if(user.id != this.message.author.id) return;
            if(reaction.emoji.name == this.emojiName[0] && user.id === this.reactor.id) {
                this.refresh(user);
                if(this.guild.member(this.client.user).hasPermission("MANAGE_MESSAGES")) {
                    reaction.remove(user.id);
                };
            };
            if(reaction.emoji.name == this.emojiName[1] && user.id === this.reactor.id) {
                this.end(user);
                if(this.guild.member(this.client.user).hasPermission("MANAGE_MESSAGES")) {
                    reaction.remove(user.id);
                };
            };
        })
    }
    async switchPage(pageNum) {
        if(this.stopped == true) return;
        this.currentPage = pageNum;
        let toget = this.pages[pageNum];
        if (this.enabled === true) {
            await this.npmessage.edit(
            new RichEmbed()
            .setAuthor(this.embedTitle, this.embedAuthor)
            .setThumbnail(toget.thumbnail.url)
            .setColor(toget.color)
            .addField(toget.fields[0].name, toget.fields[0].value)
            .addField(toget.fields[1].name, toget.fields[1].value)
            .setFooter(toget.footer.text, toget.footer.icon_url))
        } else {
            this.enabled = true;
            this.npmessage = await this.message.send(
            new RichEmbed()
            .setAuthor(this.embedTitle, this.embedAuthor)
            .setThumbnail(toget.thumbnail.url)
            .setColor(toget.color)
            .addField(toget.fields[0].name, toget.fields[0].value)
            .addField(toget.fields[1].name, toget.fields[1].value)
            .setFooter(toget.footer.text, toget.footer.icon_url))
            for(var reaction of this.emoji) {
                await this.npmessage.react(reaction);
            }
        }
    }
    async refresh(user) {
        try {
            if(!this.message.member.voiceChannel) return;
            if(!this.client.queue[this.guild.id]) return;
            this.npmessage.edit(await this.client.npMessage(this.client, this.message, this.client.queue[this.guild.id]))
        } catch (e) {
            return false;
        }
    }
    end() {
        if(this.guild.member(this.client.user).hasPermission("MANAGE_MESSAGES")) {
            this.npmessage.delete()
        }
    }
}