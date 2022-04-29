const { MessageEmbed } = require('discord.js');
const GLang = require('../../models/Language.js');

module.exports = {
  name: "language",
  aliases: ["setlang", "lang"],
  usage: "<language>",
  category: "Utility",
  description: "Change the language for the bot",
  accessableby: "Members",
  run: async (client, message, args, language) => {

    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send(`${client.i18n.get(language, "utility", "lang_perm")}`);
    if (!args[0]) return message.channel.send(`${client.i18n.get(language, "utility", "lang_arg")}`);
    const languages = client.i18n.getLocales();
    if (!languages.includes(args[0])) return message.channel.send(`${client.i18n.get(language, "utility", "provide_lang", {
      languages: languages.join(', ')
    })}`);

    const newLang = await GLang.findOne({ guild: message.guild.id });
    if (!newLang) {
      const newLang = new GLang({
        guild: message.guild.id,
        language: args[0]
      });
      newLang.save().then(() => {
        const embed = new MessageEmbed()
          .setDescription(`${client.i18n.get(language, "utility", "lang_set", {
            language: args[0]
          })}`)
          .setColor(client.color)

        message.channel.send({ embeds: [embed] });
      }
      ).catch(() => {
        message.channel.send(`${client.i18n.get(language, "utility", "Lang_error")}`);
      });
    }
    else if (newLang) {
      newLang.language = args[0];
      newLang.save().then(() => {
        const embed = new MessageEmbed()
          .setDescription(`${client.i18n.get(language, "utility", "lang_change", {
            language: args[0]
          })}`)
          .setColor(client.color)

        message.channel.send({ embeds: [embed] });
      }
      ).catch(() => {
        message.channel.send(`${client.i18n.get(language, "utility", "Lang_error")}`);
      });
    }
  }
}