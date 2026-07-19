module.exports = {
    name: "welcome",

    async execute(member) {

        const channel = member.guild.channels.cache.find(
            ch => ch.name === "welcome"
        );

        if (!channel) return;


        channel.send({
            content:
            `👋 Welcome ${member} to **${member.guild.name}**!`
        });

    }
};
