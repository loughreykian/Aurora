const chalk = require("chalk");
const moment = require("moment-timezone");

exports.log = (content, type = "log") => {
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
  switch (type) {
    case "log": {
      return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
    }
    case "warn": {
      return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
    }
    case "error": {
      return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
    }
    case "debug": {
      return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
    }
    case "cmd": {
      return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
    }
    case "event": {
      return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
    }
    case "ready": {
      return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
    }
    case "voiceEngine": {
      return console.log(`${timestamp} ${chalk.black.bgMagenta(type.toUpperCase())} ${content}`);
    }
    case "func": {
      return console.log(`${timestamp} ${chalk.black.bgRed(type.toUpperCase())} ${content}`);
    }
    case "reload": {
      return console.log(`${timestamp} ${chalk.green.bgBlack(type.toUpperCase())} ${content}`);
    }
    default: {
      return this.log;
    }
  }
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");

exports.event = (...args) => this.log(...args, "event");

exports.voiceEngine = (...args) => this.log(...args, "voiceEngine");

exports.func = (...args) => this.log(...args, "func");

exports.reload = (...args) => this.log(...args, "reload");