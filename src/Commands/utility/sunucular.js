module.exports = {
    name: 'guildslist',
    category: 'Bot',
    botOwner: true,
    run: async (client, message, args) => {
        const guilds = client.guilds.cache.map(guild => {
            return {
                id: guild.id,
                name: guild.name
            };
        });

        message.reply(`Servers that the bot is attached to:\n${guilds.map(guild => `${guild.name} - ${guild.id}`).join('\n')}`);
    }
}