// Example of how to make a Command

module.exports = {
    name: "ping",
    aliases: ["pong", "latency"],
    category: "Utility",
    description: "Check the bot's ping!",
    ownerOnly: false,
    run: async (client, message, args, language) => {
        const msg = await message.channel.send(`🏓 Pinging...`);

        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle(':signal_strength: Bot Ping')
            .addField(`${client.i18n.get(language, "utility", "time")}`, `${Math.floor(msg.createdAt - message.createdAt)}ms`, true)
            .addField("API Ping", `${client.ws.ping}ms`, true)
            .setColor(client.config.Embed.Color)
            .setFooter({ text: `${client.config.Embed.Copyrigth}`, iconURL: `${client.user.displayAvatarURL()}` });

        await message.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser: false } });

        msg.delete();
    },
};
