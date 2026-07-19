module.exports = {
    name: "kick",

    async execute(message) {

        if (!message.member.permissions.has("KickMembers")) {
            return message.reply(
                "❌ You need Kick Members permission."
            );
        }


        const user = message.mentions.members.first();


        if (!user) {
            return message.reply(
                "❌ Mention a user to kick."
            );
        }


        if (!user.kickable) {
            return message.reply(
                "❌ I can't kick this user."
            );
        }


        await user.kick();


        message.channel.send(
            `👢 Kicked ${user.user.tag}`
        );

    }
};
