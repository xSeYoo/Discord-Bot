const { Client, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'announce',
  description: 'Used to announce something',
  userPerms: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let ch1 = args[0]
    const ch = message.mentions.channels.first() || message.member;
    if (!ch) return message.reply({ content: "Please provide a **valid** channel to send the announcement in." })
    let txt = args.join(" ").slice(ch1.length + 1)
    if (!txt) return message.reply({ content: "please input text" })
    if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply({ content: "You don't have permissions to use this!" })// Permission lock
    const embed = new MessageEmbed()
      .setTitle(`**There's an announcement!**`)
      .setDescription(`tes:${txt}\n\n @everyone`)
      .setColor('#be55ed')
      // .setFooter(`Announcement made by ${message.author.tag}`,`${message.author.displayAvatarURL({dynamic : true})}`) // Change the stuff in the footer to make it anonymous
      .setFooter({ text: `Announcement made by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
      .setTimestamp()
    await message.reply({ content: "Announcemen Succesfuly send" });
    //await message.ch.send({ embeds: [embed] });
    await ch.send({ embeds: [embed] })

  }
}