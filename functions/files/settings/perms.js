const r = require('rethinkdb');
let permFile = require(`${process.cwd()}/structures/settings.json`);

/*

- Grab, update, and view permissions through the <message> object
- Format: <message>.perms(options);
- grab: <boolean>, Grab a permission through a command or group.
- view: <boolean>, Whether or not to view the permission.
- update: <boolean>, Whether or not to update permissions.
- key: <value>, Command or category.
- value: <value>, If editing, this is the value to give

*/

module.exports = async function(message, options) {
    try {

        if(!message.guild.available) return message.send(`${message.emote('error')} Guild is currently unavailable.`);

        if(options) {

            const permsTable = await r.table('perms').get(message.guild.id).run(message.client.dbConnection);

            if(options.grab) {

                try {

                    if(options.key.includes(":")) {
                        options.key = options.key.split(':')[1];
                        
                        if(!permsTable[options.key] && message.client.commands[options.key]) return message.client.commands[options.key].details.perms;
                        
                        if(permsTable[options.key]) return permsTable[options.key];

                        return false;
                    };

                    if(!message.client.commands[options.key] && !message.client.groups[options.key]) return false;

                    if(permsTable[options.key]) return permsTable[options.key];

                    if(!permsTable[options.key] && message.client.commands[options.key]) return message.client.commands[options.key].details.perm;

                    if(!permsTable[options.key] && message.client.groups[options.key]) return 'OPEN';

                    return false;

                } catch (e) {
                    console.log(e)
                    return false;
                };
            }
           
            else
            
            if(options.view) {
                try {

                    if([null, undefined].includes(options.key)) return false;

                    if(!message.client.commands[options.key] && !message.client.groups[options.key]) return message.send(`${message.emote('error')} That command or group does not exist.`);

                    return message.send(`📑 The current permission for ${options.key} is \`${permsTable[options.key] ? permsTable[options.key] : (message.client.groups[options.key] ? 'OPEN' : message.client.commands[options.key].details.perm)}\``);

                    return null;

                } catch (e) {
                    console.log(e)
                    return false;
                };
            }

            else

            if(options.update) {
                try {
                    if(!options.key || !options.value) return false;

                    let cmd = message.client.commands[options.key.toLowerCase()];
                    let group = message.client.groups[options.key.toLowerCase()];

                    if(group) {
                        if(['utility', 'system'].includes(group)) return message.send(`${message.emote('error')} That permission can not be updated.`);
                    };

                    if(cmd) {
                        if(['BOT_OWNER', 'DONATOR', 'OPEN'].includes(cmd.details.perm)) return message.send(`${message.emote('error')} That permission can not be updated.`);
                    };

                    let permission;

                    if(permFile.perms.perms[options.value.toUpperCase()]) permission = true;

                    if(message.content.includes(':')) options.key = options.key.slice(':')[1];
                    
                    if((message.client.groups[options.key] || message.client.commands[options.key]) && options.value.toLowerCase() === 'default') {
                        let option;
                        let option2;

                        if(message.client.groups[options.key]) option = 'OPEN', option2 = message.client.groups[options.key];
                        
                        if(message.client.commands[options.key]) option = message.client.commands[options.key].details.perm, option2 = message.client.commands[options.key].details.base;

                        r.table('perms').get(message.guild.id).update({ [option2]: option }).run(message.client.dbConnection);

                        return message.send(`${message.emote('success')} Updated ${options.key} to default.`);
                    };

                    let role;

                    if(!permission) {
                        role = message.guild.roles.find(r => r.name.toLowerCase().startsWith(options.value));
                        if(!role) return message.send(`${message.emote('exclamation')} That role does not exist.`);

                        options.value = role.name;
                    };    
                    
                    //if(!permFile.perms.names[options.key] && !message.client.commands[options.key] && !message.client.groups[options.key]) return message.send(`${message.emote('error')} That key does not exist.`);

                    let update = function(_this) {

                        if(message.client.commands[options.key]) return message.client.commands[options.key].details.base;

                        if(message.client.groups[options.key]) return message.client.groups[options.key];
                        
                        return false;
                    };

                    update = update(options.key);
                    if(update == false) return false;

                    r.table('perms').get(message.guild.id).update({[update]: options.value }).run(message.client.dbConnection);

                    return message.send(`${message.emote('success')} Permissions for ${options.key} have been set to \`${options.value}\``);

                    return false;

                } catch (e) {
                    console.log(e)
                    return false;
                };
            }

            else

            if(options.reset) {
                try {

                    let msg = await message.send(`${message.emote('dot')} Resetting perms...`);
                    await r.table('perms').get(message.guild.id).delete().run(message.client.dbConnection);
                    message.client.functions['dbAddPerms'](message.client, message.guild);
                    return msg.edit(`${message.emote('success')} All perms reset.`);

                } catch (e) {
                    return false;
                };
            };

        } else {
            return false;
        };

    } catch (e) {
        return false;
    };
};