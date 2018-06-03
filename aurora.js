const Discord = require('discord.js');
const { Client, Collection, RichEmbed } = require('discord.js');
const { PlayerManager } = require('discord.js-lavalink');
const path = require('path');
const { join } = require('path');
const klaw = require('klaw');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const r = require('rethinkdb');
const fs = require('fs');

new class extends Client {
    constructor() {
        super({
            fetchAllMembers: true
        });

        this.this = new Object(this);

        this.commands = new Object();
        this.aliases = new Object();
        this.queue = new Object();
        this.blacklist = new Object();
        this.groups = new Object();
        this.permLevels = new Object();
        this.functions = new Object();
     

        this.config = require('./config.js');
        this.logger = require("./modules/logger.js");

        require('./modules/prototypes.js')(this);
        require('./structures/command.js');
        
        this.init();

        this.login(this.config.token);
    };

    async init() {
        //Commands
        try {

            let dataArray = fs.readdirSync(__dirname + "/commands/");
                dataArray.forEach(folder => { if(folder.split(".")[1] != '') return false, readdir(__dirname + `/commands/${folder}/`).then(files => {
                    files.forEach(file => {
                        let fileBreak = file.split(".");
                        let fileName = fileBreak[0];
                        if(fileBreak[1] !== 'js') return false;
                        let filePath = `${folder}/${file}`;
                        let command = new (require(__dirname + `/commands/${folder}/${file}`))(null, filePath, folder);

                        this.commands[command.details.base] = command;
                        this.groups[folder] = folder;
                        if(command.conf.aliases) {
                            command.conf.aliases.forEach(alias => {
                                this.aliases[alias] = command.details.base;
                            });
                        };

                        this.logger.cmd(`✔ Loaded command: ${file}`);
                    });
                })});

        } catch (e) {
            this.logger.error(`Error loading command: ${e}`)
        };
        //Events
        try {
            let events = fs.readdirSync(__dirname + "/events/");
                events.forEach(item => {
                    const eventBreak = item.split(".");
                    const eventName = eventBreak[0];
                    if(eventBreak[1] !== 'js') return false;
                    const event = require(__dirname + `/events/${item}`);
                    this.on(eventName, event.bind(null, this));
                    this.logger.event(`✔ Loaded event: ${eventName}`)
                });
        } catch (e) {
            this.logger.error(`Error loading event ${file}: ${e}`)
        };

        //Database
        try {
            this.dbConnection = await r.connect({
                host: "localhost",
                port: 28015,
                db: 'guildSettings'
            });
            this.logger.log('Successfully connected to the database.');

            try {
                r.table('guilds').run(this.dbConnection);
            } catch (e) {
                r.tableCreate('guilds').run(this.dbConnection);
            };
            try {
                r.table('perms').run(this.dbConnection);
            } catch (e) {
                r.tableCreate('perms').run(this.dbConnection);
            };


        } catch (e) {
            this.logger.error(`Error connecting to the database: ${e}`)
        };

        let _functions = require('./functions/loader.js');
        let functions = _functions.call(this, this);
        let _perms = require('./perms/types/loader.js');
        let permLevels = _perms.call(this, this);

        //Process
        process.once("uncaughtException", err => {
          this.logger.warn(`Uncaught Exception: ${err}`)
        });

        process.once("unhandledRejection", err => {
            this.logger.warn(`Unhandled Rejection: ${err.stack}`)
        });
        
        process.once('UnhandledPromiseRejectionWarning', err => {
            this.logger.warn(`UnhandledPromiseRejectionWarning: ${err}`)
        });

    };

    fetchCommand(command) {
        if (this.commands[command]) return this.commands[command];
        if(this.aliases[command]) return this.commands[this.aliases[command]];
        return false;
     };
};