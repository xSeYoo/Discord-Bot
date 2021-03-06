const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const { GetUser, GetGlobalUser } = require("../../handler/functions")
const flags = {
  DISCORD_EMPLOYEE: 'Discord Employee',
  DISCORD_PARTNER: 'Discord Partner',
  BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
  BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
  HYPESQUAD_EVENTS: 'HypeSquad Events',
  HOUSE_BRAVERY: 'House of Bravery',
  HOUSE_BRILLIANCE: 'House of Brilliance',
  HOUSE_BALANCE: 'House of Balance',
  EARLY_SUPPORTER: 'Early Supporter',
  TEAM_USER: 'Team User',
  SYSTEM: 'System',
  VERIFIED_BOT: 'Verified Bot',
  VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
  if (Array.from(arr.values()).length > maxLen) {
    const len = Array.from(arr.values()).length - maxLen;
    arr = Array.from(arr.values()).sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
    arr.map(role => `<@&${role.id}>`)
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}
const statuses = {
  "online": "🟢",
  "idle": "🟠",
  "dnd": "🔴",
  "offline": "⚫️",
}
module.exports = {
  name: "userinfo", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Utility", //the command category for helpcmd [OPTIONAL]
  aliases: ["uinfo", "whoami"], //the command aliases for helpcmd [OPTIONAL]
  description: "Shows Information of a User", //the command description for helpcmd [OPTIONAL]
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
          if (!e) return message.reply("UNABLE TO FIND THE USER")
          return message.reply(e)
        }
      } else {
        user = message.author;
      }
      if (!user || user == null || user.id == null || !user.id) return message.reply("❌ Could not find the USER")
      try {
        const member = message.guild.members.cache.get(user.id);
        const roles = member.roles;
        const userFlags = member.user.flags.toArray();
        const activity = member.user.presence.activities[0];
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Information about:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
        embeduserinfo.addField('**❱ Username:**', `<@${member.user.id}>\n\`${member.user.tag}\``, true)
        embeduserinfo.addField('**❱ ID:**', `\`${member.id}\``, true)
        embeduserinfo.addField('**❱ Avatar:**', `[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`, true)
        embeduserinfo.addField('**❱ Date Join DC:**', "\`" + moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`", true)
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
        embeduserinfo.addField(`❱ [${roles.cache.size}] Roles: `, roles.cache.size < 25 ? Array.from(roles.cache.values()).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None')
        embeduserinfo.setColor(client.config.Embed.Color)
        embeduserinfo.setFooter(client.config.Embed.Copyrigth, client.config.Embed.Icon)
        //send the EMBED
        message.reply({ embeds: [embeduserinfo] })
      } catch (e) {
        console.log(e)
        const userFlags = user.flags.toArray();
        const activities = user.presence.activity[0];
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Information about:   " + user.username + "#" + user.discriminator, user.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
        embeduserinfo.addField('**❱ Username:**', `<@${user.id}>\n\`${user.tag}\``, true)
        embeduserinfo.addField('**❱ ID:**', `\`${user.id}\``, true)
        embeduserinfo.addField('**❱ Avatar:**', `[\`Link to avatar\`](${user.displayAvatarURL({ format: "png" })})`, true)
        embeduserinfo.addField('**❱ Flags:**', `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, true)
        embeduserinfo.addField('**❱ Status:**', `\`${statuses[user.presence.status]} ${user.presence.status}\``, true)
        embeduserinfo.addField('**❱ Is a Bot:**', `\`${user.bot ? "✔️" : "❌"}\``, true)
        var userstatus = "Not having an activity";
        if (activities) {
          if (activities.type === "CUSTOM_STATUS") {
            let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`
            userstatus = `${emoji} \`${activity.state || 'Not having an acitivty.'}\``
          }
          else {
            userstatus = `\`${activities.type.toLowerCase().charAt(0).toUpperCase() + activities.type.toLowerCase().slice(1)} ${activities.name}\``
          }
        }
        embeduserinfo.addField('**❱ Activity:**', `${userstatus}`)
        embeduserinfo.addField('**❱ Permissions:**', `${member.permissions.toArray().map(p => `\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(client.config.Embed.Color)
        embeduserinfo.setFooter(client.config.Embed.Copyrigth, client.config.Embed.Color)
        //send the EMBED
        message.reply({ embeds: [embeduserinfo] })
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(client.config.Embed.Wrong)
          .setFooter(client.config.Embed.Copyrigth, client.config.Embed.Icon)
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]
      });
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */