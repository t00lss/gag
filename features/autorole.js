module.exports = {
    name: "autorole",

    async execute(member) {

        const roleName = "Member";


        const role = member.guild.roles.cache.find(
            role => role.name === roleName
        );


        if (!role) return;


        await member.roles.add(role)
            .catch(() => {});

    }
};
