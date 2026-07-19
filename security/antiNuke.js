const actions = new Map();

module.exports = async (guild, user, action) => {

    const key = `${guild.id}-${user.id}-${action}`;

    if (!actions.has(key)) {
        actions.set(key, []);
    }


    const logs = actions.get(key);

    logs.push(Date.now());


    const recent = logs.filter(
        time => Date.now() - time < 10000
    );


    actions.set(key, recent);


    // 5 dangerous actions in 10 seconds
    if (recent.length >= 5) {

        console.log(
            `🚨 Anti-Nuke triggered: ${user.tag} did ${action}`
        );


        return true;
    }


    return false;
};
