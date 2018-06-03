const util = require('util');
const wait = util.promisify(setTimeout);

module.exports = async function(client) {
	await Promise.all([...client.voiceEngine.values()].map(player => {
        player.pause(true);
        return wait(750).then(() => player.pause(false));
    }));
}