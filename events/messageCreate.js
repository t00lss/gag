const { EmbedBuilder } = require("discord.js");
const antiSpam = require("../security/antiSpam");

const PREFIX = ",";

module.exports = async (client, message) => {

    if (message.author.bot) return;


    // Anti Spam Protection
    const spammed = await antiSpam(message);

    if (spammed) {
        return message.channel.send(
            `🛡️ ${message.author} was timed out by GAG Anti-Spam`
        );
    }


    if (!message.content.startsWith(PREFIX))
        return;


    const args = message.content
        .slice(PREFIX.length)
        .trim()
        .split(/ +);


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
\`,timeout @user\`

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


    if (command === "clear") {

        if (!message.member.permissions.has("ManageMessages"))
            return;


        const amount = Number(args[0]);


        if (!amount)
            return message.reply(
                "Give an amount."
            );


        await message.channel.bulkDelete(
            amount,
            true
        );


        message.channel.send(
            `🧹 Deleted ${amount} messages`
        );

    }

};
