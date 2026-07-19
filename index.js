require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection,
    EmbedBuilder
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const PREFIX = ",";

client.commands = new Collection();

client.once("ready", () => {
    console.log(`✅ GAG is online as ${client.user.tag}`);

    client.user.setPresence({
        activities: [
            {
                name: "GAG Protection",
                type: 3
            }
        ],
        status: "online"
    });
});


client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content
        .slice(PREFIX.length)
        .trim()
        .split(/ +/);

    const command = args.shift().toLowerCase();


    if (command === "help") {

        const embed = new EmbedBuilder()
            .setTitle("👻 GAG Help")
            .setDescription(`
**Moderation**
\`,ban @user\`
\`,kick @user\`
\`,clear amount\`
\`,timeout @user time\`

**Security**
🛡️ Anti Spam
🛡️ Anti Raid
🛡️ Anti Nuke

**Utility**
\`,ping\`
\`,help\`
            `)
            .setColor("Purple");

        return message.reply({
            embeds: [embed]
        });
    }


    if (command === "ping") {
        return message.reply(
            `🏓 Pong! ${client.ws.ping}ms`
        );
    }


    if (command === "clear") {

        if (!message.member.permissions.has("ManageMessages"))
            return;

        const amount = Number(args[0]);

        if (!amount)
            return message.reply("Give an amount.");

        await message.channel.bulkDelete(
            amount,
            true
        );

        message.channel.send(
            `🧹 Deleted ${amount} messages`
        );
    }


    if (command === "kick") {

        if (!message.member.permissions.has("KickMembers"))
            return;

        const user = message.mentions.members.first();

        if (!user)
            return message.reply("Mention a user.");

        await user.kick();

        message.channel.send(
            `👢 Kicked ${user.user.tag}`
        );
    }


    if (command === "ban") {

        if (!message.member.permissions.has("BanMembers"))
            return;

        const user = message.mentions.members.first();

        if (!user)
            return message.reply("Mention a user.");

        await user.ban();

        message.channel.send(
            `🔨 Banned ${user.user.tag}`
        );
    }

});


client.login(process.env.TOKEN);
