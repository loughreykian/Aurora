const snekfetch = require('snekfetch');

module.exports = async function(client, string, options) {
	try {
    	const track = await snekfetch.get(`http://localhost:${client.config.portMusic}/loadtracks?identifier=${`${options.link ? '' : 'ytsearch:'}${string}`}`)
    	.set("Authorization", "youshallnotpass")
    	.catch((e) => console.log(e.stack));
  		if (!track || !track.body) throw 'No results.';
  		return track.body[0];
	} catch (e) {
		return false;
	};
};