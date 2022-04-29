const GLang = require('../../models/Language.js');
module.exports = {
  name: 'interactionCreate',

  /**
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;
        let LANGUAGE = client.i18n;
    
    let guildModel = await GLang.findOne({ guild: interaction.guild.id });
    if (guildModel && guildModel.language) LANGUAGE = guildModel.language;
    
    const language = LANGUAGE;

    const command = client.slash.get(interaction.commandName);
    if (!command) return interaction.reply({ content: client.i18n.get(language, "interaction", "cmd_error") });

    if (command.ownerOnly) {
      if (interaction.user.id !== client.config.Role) {
        return interaction.reply({ content: client.i18n.get(language, "interaction", "owner") , ephemeral: true });
      }
    }
    if (command.userPerms) {
      if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has(command.userPerms || [])) {
        if (command.noUserPermsMessage) {
          return interaction.reply(command.noUserPermsMessage)
        } else if (!command.noUserPermsMessage) {
          return interaction.reply(`${client.i18n.get(language, "interaction", "user_perms", { perms: command.userPerms })} You need the \`${command.userPerms}\` permission to use this command!`)
        }
      }
    }

    if (command.botPerms) {
      if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(client.user.id).permissions.has(commands.botPerms || [])) {
        if (command.noBotPermsMessage) {
          return interaction.reply(command.noBotPermsMessage)
        } else if (!command.noBotPermsMessage) {
          return interaction.reply(`${client.i18n.get(language, "interaction", "botperms", {botperm: command.userPerms})}`)
        }
      }
    }

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === 'SUB_COMMAND') {
        if (option.name) args.push(option.name);
        option.options ?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {
      command.run(client, interaction, args, language)
    } catch (e) {
      interaction.reply({ content: e.message });
    }
  }
}
