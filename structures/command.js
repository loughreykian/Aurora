class Command {
    constructor(client, filePath, group, {conf, help, details}) {
        this.client = client;

        this.path = filePath;

        this.group = group;

        this.conf = {
            enabled: conf.enabled,
            guildOnly: conf.guildOnly,
            aliases: conf.aliases || new Array(),
        };

        this.help = {
            name: help.name || "NULL",
            category: help.category || "NULL",
            description: help.description || "NULL",
            usage: help.usage || "NULL",
            examples: help.examples || new Array(),
        };

        this.details = {
          fileName: details.fileName || "NULL",
          base: details.base || "NULL",
          perm: details.perm || "NULL",
          reqPerms: details.reqPerms || new Array()
        }
    }
};

module.exports = Command;
