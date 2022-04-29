module.exports = {
  name: "userinfo",
  aliases: ["infouser", "whoami"],
  description: "shows Information of a User",
  run: async (client, message, args, language) => {
    try {
      var user;
      if (args[0]) {
        try {
          if (args[1] && args[1].toLowerCase() == "global") {
            args.pop()
            user = await GetGlobalUser(message, args)
          } else {
            user = await GetUser(message, args)
          }
        } catch (e) {
          if (!e) return message.reply(client.i18n.get(language, "utility", "userinfo_error"))
          return message.reply(e)
        }
      } else {
        user = message.author;
      }
      if (!user || user == null || user.id == null || !user.id) return message.reply(client.i18n.get(language, "utilty", "userinfo_user"))
      try {
        const member = message.guild.members.cache.get(user.id);
        const roles = member.roles;
        const userFlags = member.user.flags.toArray();
        const activity = member.user.presence.activities[0];
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor(client.i18n.get(language, "utility", "userinfo_author") + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://discord.io/DiscordBot")
        embeduserinfo.addField(client.i18n.get(language, "utility", "userinfo_name"), `<@${member.user.id}>\n\`${member.user.tag}\``, true)
        embeduserinfo.addField('**❱ ID:**', `\`${member.id}\``, true)
        embeduserinfo.addField('**❱ Avatar:**', `[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`, true)
        embeduserinfo.addField(client.i18n.get(language, "utility", "userinfo_date_dc") , "\`" + moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`", true)
        embeduserinfo.addField('**❱ Date Join Guild:**', "\`" + moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.joinedTimestamp).format("hh:mm:ss") + "\`", true)
        embeduserinfo.addField('**❱ Flags:**', `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, true)
        embeduserinfo.addField('**❱ Status:**', `\`${statuses[member.user.presence.status]} ${member.user.presence.status}\``, true)
        embeduserinfo.addField('**❱ Highest Role:**', `${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`, true)
        embeduserinfo.addField('**❱ Is a Bot:**', `\`${member.user.bot ? "✔️" : "❌"}\``, true)
        var userstatus = "Not having an activity";
        if (activity) {
          if (activity.type === "CUSTOM_STATUS") {
            let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`
            userstatus = `${emoji} \`${activity.state || 'Not having an acitivty.'}\``
          }
          else {
            userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
          }
        }
        embeduserinfo.addField('**❱ Activity:**', `${userstatus}`)
        embeduserinfo.addField('**❱ Permissions:**', `${member.permissions.toArray().map(p => `\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(ee.color)
        embeduserinfo.setFooter(ee.footertext, ee.footericon)
        //send the EMBED
        message.reply({ embeds: [embeduserinfo] })
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]
      });
    }
  }