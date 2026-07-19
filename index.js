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


// Load commands
client.commands = new Map();

const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(
        command.name,
        command
    );

    console.log(
        `Loaded command: ${command.name}`
    );
}


// Ready event
client.once("ready", () => {

    console.log(
        `✅ ${client.user.tag} online`
    );

});


// Welcome + Autorole
client.on("guildMemberAdd", async (member) => {

    const welcome = require("./features/welcome");
    const autorole = require("./features/autorole");


    await welcome.execute(member);

    await autorole.execute(member);

});


// Messages
client.on("messageCreate", async (message) => {

    if (message.author.bot) return;


    if (!message.content.startsWith(",")) return;


    const args = message.content
        .slice(1)
        .trim()
        .split(/ +);


    const commandName = args.shift().toLowerCase();


    const command = client.commands.get(commandName);


    if (!command) return;


    command.execute(
        message,
        args,
        client
    );

});


client.login(process.env.TOKEN);
