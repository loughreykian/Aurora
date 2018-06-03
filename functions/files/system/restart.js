const spawn = require('child_process').spawn;
const r = require('rethinkdb');

module.exports = function(message) {

  message.client.removeAllListeners();
		
	if (process.env.process_restarting) {
    	delete process.env.process_restarting;
    	setTimeout(this['restart'], 1000);
  	};

	spawn(process.argv[0], process.argv.slice(1), {
    	env: { 
    		process_restarting: 1 
    	},
    	stdio: 'ignore',
      	detached: true
  	}).unref();

  return 'restarted';
};