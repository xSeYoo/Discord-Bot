const { Client, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'announce',
  description: 'Used to announce something',
  options: [
    {
      name: "channel",
      description: "select channel",
      type: "CHANNEL",
      required: true
    },
    {
      name: "title",
      description: "Set your title",
      type: "STRING",
      required: true
    },
    {
      name: "contents",
      description: "input text",
      type: "STRING",
      required: true
    },
  ],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, interaction, args, language) => {
    let channel = interaction.options.getChannel('channel')
    let judul = interaction.options.getString(`title`)
    let txt = interaction.options.getString('contents')
    const embed = new MessageEmbed()
      .setTitle(`${judul}`)
      .setDescription(`${txt}\n\n @everyone`)
      .setColor('#be55ed')
      //   .setFooter(`Announcement made by ${interaction.user.tag}`,`${interaction.user.displayAvatarURL({dynamic : true})}`) // Change the stuff in the footer to make it anonymous
      .setFooter({ text: `Announcement made by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })

      .setTimestamp()
    await interaction.reply({ content: "Announcemen Succesfuly send" });
    await channel.send({ embeds: [embed] });
  }
}