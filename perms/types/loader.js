const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const fs = require('fs');

module.exports = async function(client) {
    try {
       
        let files = fs.readdirSync(__dirname + '/files/');
        files.forEach(file => {
            const base = file.split('.');
            const fileName = base[0];
            if(base[1] !== 'js') return false;
            client.permLevels[fileName] = require(__dirname + `/files/${fileName}.js`);
            client.logger.log(`Loaded perm: ${fileName}`);
        });

    } catch (e) {
       client.logger.error(`Error loading permlevels: ${e}`)
    };
};