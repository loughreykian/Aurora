module.exports = function (message) {
	try {
		// Thanks to Indy#1010 (165535234593521673)
		const lineArray = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬'.split("");
		const dot = '🔘';
		const serverQueue = message.client.queue[message.guild.id];
		if (!serverQueue)
			return false;
		const songDuration = Math.round(serverQueue.tracks[0].duration / 1000);
		const dispatcherDuration = Math.round(message.client.voiceEngine.get(message.guild.id).state.position / 1000);
		const secPerDash = songDuration / lineArray.length;
		const index = Math.round(dispatcherDuration / secPerDash);
		lineArray[index] = dot;
		const npBar = lineArray.join("");
		return npBar;
	} catch (e) {
		return '';
	};
};