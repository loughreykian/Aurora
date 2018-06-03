module.exports = function(message, file) {

	let path;

	if(file.includes('s?')) {
		file = file.split('?')[1];
		file = file.split('>');
	};
	if(file.includes('m?')) {
		file = file.split('?')[1];
		file = file.split('>');
	};
	if(file.includes('e?')) {
		file = file.split('?')[1];
		const event = require(process.cwd() + `/events/${file}`)
	};
	if(file.includes('f?')) {
		file = file.split('?')[1];
        file = file.split('>');
        path = require(process.cwd() + `/functions${file[0]}/${file[1]}.js`);
        readdir(path).then(dataArray => {
        	client.functions[dataArray[0]] = path;
        });
	};

	if(file.includes('c?')) {
		file = file.split('?')[1];
		file = file.split('>');
		let filePath = `${file[0]}/${file[1]}`;
		let fileGroup = file[1];
		path = new(require(process.cwd() + `/commands/${file[0]}/${file[1]}`))(null, filePath, fileGroup);
		client.commands[file[1]] = path;
	};
    return null;
};