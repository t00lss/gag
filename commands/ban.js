module.exports = {
    name: "ban",

    async execute(message) {

        if (!message.member.permissions.has("BanMembers")) {
            return message.reply(
                "❌ You need Ban Members permission."
            );
        }


        const user = message.mentions.members.first();


        if (!user) {
            return message.reply(
                "❌ Mention a user to ban."
            );
        }


        if (!user.bannable) {
            return message.reply(
                "❌ I can't ban this user."
            );
        }


        await user.ban();


        message.channel.send(
            `🔨 Banned ${user.user.tag}`
        );

    }
};
