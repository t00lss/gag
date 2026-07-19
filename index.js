require("dotenv").config();

const {
    Client,
    GatewayIntentBits
} = require("discord.js");

const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});


// Load event files
const eventsFolder = "./events";

fs.readdirSync(eventsFolder).forEach((file) => {
    const event = require(`${eventsFolder}/${file}`);
    const eventName = file.split(".")[0];

    if (eventName === "ready") {
        client.once("ready", () => {
            event(client);
        });
    }

    if (eventName === "messageCreate") {
        client.on("messageCreate", (message) => {
            event(client, message);
        });
    }
});


client.login(process.env.TOKEN);
