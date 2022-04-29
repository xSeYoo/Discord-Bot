const Discord = require("discord.js");
const language = require("../../handler/index.js")

module.exports = {
  name: "invite",
  description: "Get the bot's",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args, language) => {
    let embed = new Discord.MessageEmbed()
      .setTitle("Invite Me")
      .setColor("RANDOM")
      .setDescription(
        "**Get Infinity's Invite Link [Here](https://discord.com/oauth2/authorize?client_id=733670294086221865&permissions=1584921983&scope=bot)**\n**Need assistance? Join our [Support Server](https://discord.gg/mqWprFc) now!**"
      )
      .setFooter(`${client.i18n.get(language, "utility", "request_by")} ${message.author.username}`);
    message.channel.send({ embeds: [embed] });
  },
};