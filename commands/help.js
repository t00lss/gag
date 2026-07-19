const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",

    execute(message) {

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


        message.reply({
            embeds: [embed]
        });

    }
};
