const joinMap = new Map();

module.exports = async (member) => {

    const guildId = member.guild.id;

    if (!joinMap.has(guildId)) {
        joinMap.set(guildId, []);
    }


    const joins = joinMap.get(guildId);

    joins.push(Date.now());


    const recentJoins = joins.filter(
        time => Date.now() - time < 10000
    );


    joinMap.set(guildId, recentJoins);


    // 10 joins in 10 seconds = possible raid
    if (recentJoins.length >= 10) {

        console.log(
            `🚨 Possible raid detected in ${member.guild.name}`
        );

        return true;
    }


    return false;
};
