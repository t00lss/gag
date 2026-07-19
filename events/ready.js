const { ActivityType } = require("discord.js");

module.exports = (client) => {
    console.log(`✅ ${client.user.tag} is online`);

    client.user.setPresence({
        activities: [
            {
                name: "GAG Protection",
                type: ActivityType.Watching
            }
        ],
        status: "online"
    });
};
