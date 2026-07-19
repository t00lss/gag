const { EmbedBuilder } = require("discord.js");

const PREFIX = ",";

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content
        .slice(PREFIX.length)
        .trim()
        .split(/ +/);

    const command = args.shift().toLowerCase();


    if (command === "ping") {
        return message.reply(
            `🏓 Pong! ${client.ws.ping}ms`
        );
    }


    if (command === "help") {

        const embed = new EmbedBuilder()
            .setTitle("👻 GAG Help")
            .setDescription(`
**Moderation**
\`,ban @user\`
\`,kick @user\`
\`,clear amount\`
\`,timeout @user seconds\`

**Utility**
\`,ping\`
\`,help\`

**Security**
🛡️ Anti Spam
🛡️ Anti Raid
🛡️ Anti Nuke
            `)
            .setColor("Purple");

        return message.reply({
            embeds: [embed]
        });
    }


    if (command === "clear") {

        if (!message.member.permissions.has("ManageMessages"))
            return message.reply("❌ Missing permission.");

        const amount = Number(args[0]);

        if (!amount)
            return message.reply("❌ Give an amount.");

        await message.channel.bulkDelete(
            amount,
            true
        );

        message.channel.send(
            `🧹 Deleted ${amount} messages`
        );
    }
};
