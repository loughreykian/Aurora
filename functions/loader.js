const path = require('path');
const { join } = require('path');
const klaw = require('klaw');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

module.exports = async function(client) {
   try {
	  readdir(__dirname + "/files/").then(dataArray => {
		dataArray.forEach(folder => readdir(__dirname + `/files/${folder}/`).then(files => {
		  files.forEach(async file => {
			const File = file.split(".");
			const base = File[0];
			const ext = File[1];
			if(ext !== 'js') return false;
			this.functions[`${base}path`] = `/functions/files/${folder}/${file}`;
			this.functions[base] = require(__dirname + `/files/${folder}/${file}`);
			this.logger.func(`✔ Loaded function: ${file}`);
		});
	  }));
	});
  } catch (e) {
	this.logger.error(`Error loading function ${file}: ${e}`)
  };
};