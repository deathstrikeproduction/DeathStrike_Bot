const { Client, Collection } = require('discord.js');
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
 
client.categories = fs.readdirSync("./commands/");
 
config({
    path: __dirname + "/.env"
});
 
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
 
client.on("ready", () => {
    console.log(`I am now connected to discord with account: ${client.user.username}!`);
    client.user.setActivity('https://github.com/deathstrikeproduction', {
      type: 'WATCHING'
    });
});

client.login(process.env.TOKEN);