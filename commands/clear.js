module.exports = {
    name: "clear",

    async execute(message, args) {

        if (!message.member.permissions.has("ManageMessages")) {
            return message.reply("❌ You need Manage Messages permission.");
        }


        const amount = Number(args[0]);


        if (!amount || amount < 1 || amount > 100) {
            return message.reply(
                "❌ Choose a number between 1-100."
            );
        }


        await message.channel.bulkDelete(
            amount,
            true
        );


        const msg = await message.channel.send(
            `🧹 Deleted ${amount} messages.`
        );


        setTimeout(() => {
            msg.delete().catch(() => {});
        }, 3000);

    }
};
