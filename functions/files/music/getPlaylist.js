const snekfetch = require('snekfetch');

module.exports = async function(client, id) {
	try {
		const pl = await snekfetch.get(`http://localhost:${client.config.portMusic}/loadtracks?identifier=${id}`)
    	.set("Authorization", "youshallnotpass")
    	.catch(e => { return false; })
    	if(!pl.ok) return 'Error getting playlist.';
  		if (!pl || !pl.body) throw 'No results';
  		return pl.body;
	} catch (e) {
		return false;
	};
};
