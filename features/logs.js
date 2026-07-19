module.exports = {
    name: "logs",

    async send(guild, message) {

        const channel = guild.channels.cache.find(
            ch => ch.name === "logs"
        );

        if (!channel) return;


        channel.send({
            embeds: [
                {
                    title: "📜 Log",
                    description: message,
                    color: 0x800080,
                    timestamp: new Date()
                }
            ]
        });

    }
};
