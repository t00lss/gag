const spamMap = new Map();

module.exports = async (message) => {
    if (message.author.bot) return false;

    const userId = message.author.id;

    if (!spamMap.has(userId)) {
        spamMap.set(userId, []);
    }

    const timestamps = spamMap.get(userId);

    timestamps.push(Date.now());

    const recent = timestamps.filter(
        time => Date.now() - time < 5000
    );

    spamMap.set(userId, recent);


    if (recent.length >= 6) {

        if (message.member && message.member.moderatable) {
            await message.member.timeout(
                60000,
                "GAG Anti-Spam"
            );
        }

        spamMap.delete(userId);

        return true;
    }

    return false;
};
