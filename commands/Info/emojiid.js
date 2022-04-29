const Discord = module.require("discord.js");

module.exports = {
  name: "emoji",
  description: "Get ID of emojis",
  run: async (client, message, args, language) => {
      const emojiName = args.join(" ")
      const emoji = client.emojis.cache.find(emoji => emoji.name === emojiName);
      if (!emoji) {
        return message.reply(
          "Couldn't find the Emojis with the provided name. Please make sure the Emoji name is correct"
        );
      }
     message.reply(`\`\`\`${emoji}\`\`\``);
  },
};