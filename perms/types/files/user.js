module.exports = function(message) {
	try {

		if(!message.command) return false;
		
		if(message.author.id == message.client.config.ownerID) return true;
    	if(['system', 'utility'].includes(message.command.group)) return false;
    
    	if(message) return true;

    	return false;
    } catch (e) {
    	return false;
    };
};