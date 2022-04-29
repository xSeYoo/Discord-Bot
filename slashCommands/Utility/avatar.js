const discord = module.require("discord.js");

module.exports = {
  name: "avatar",
  category: "Utility",
  usage: "avatar/avatar @user",
  description: "Gives avatar for message author or mentioned user.",
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  options: [
    {
      name: "user",
      description: "mention this user",
      type: "USER",
      required: true
    }
  ],
  run: async (client, interaction) => {
    let target = interaction.options.getUser("user") || interaction.author;
    let embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${target.tag || target.author.tag}`)
      .setDescription(
        `[Avatar Link](${target.displayAvatarURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })})`
      )
      .setImage(target.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    interaction.reply({ embeds: [embed] });
  }
};