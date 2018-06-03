# Aurora

A Discord music bot created by Papple#3899 (342180964975247383)

Aurora Bot is a Music Bot, with a custom Permissions and Settings
system from scratch. Unlike any other music bot, it includes a music
"board" or "player," allowing the user to play/pause, skip, stop, and
view the now playing song. The board is auto-updating, constantly seeing the thumbnail
and position of the current song.

Aurora is equipped with a custom command handler packed with efficiency, making sure each built in command is added with the simplicity of a file. It also has its own functions system, allowing for a function to be added without hassle.

## Requirements

- [Node.js](https://nodejs.org/en/) v8.0 or higher
- RethinkDB installed
- 400 MB of free ram (Lavalink brings a dead weight of average 300MB)

## Installing

Either clone or download the repository, install the required node modules
with `npm i --save` and then install [Lavalink](https://github.com/Frederikam/Lavalink) and [Discord.js-Lavalink](https://github.com/MrJacz/discord.js-lavalink#readme)
or with `npm i discord.js-lavalink --save`.

Once done:

- Look at config.js-example, remove the `-example` section, enter your own info.

## Running

In order to run the bot:

- Start the Lavalink server by `cd Lavalink`, `java -jar Lavalink.jar`
- Start the RethinkDB server (`rethinkdb` in a command line)
- Start the bot with `node aurora.js`

## Expansion

- In order to add a function, either add a function to the current folders or create a new folder and add a function into it.
- In order to add a new command, check out the `layout.txt` in the `structures` folder. The function to be executed is in the `execute` function, and the paramaters are in the constructor.

## NOTES

- WARNING: RethinkDB can be very wonky if the database `guildSettings` and tables `guilds` and `perms` do not exist.
- This project is no longer actively being developed. If there is an issue, report it and I may try and fix it. I am also looking to fix the compatability with rethinkdb acting weird when the proper databases and tables do not exist.
- Creating and adding your bot to a guild will be done outside of this project. See Discord development documentation for instructions.