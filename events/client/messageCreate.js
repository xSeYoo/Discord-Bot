const GLang = require('../../models/Language.js');

module.exports = {
  name: 'messageCreate',

  /**
   * @param {Message} message 
   * @param {Client} client 
   */
  async execute(message, client) {

    let LANGUAGE = client.i18n;
    
    let guildModel = await GLang.findOne({ guild: message.guild.id });
    if (guildModel && guildModel.language) LANGUAGE = guildModel.language;
    
    const language = LANGUAGE;
    
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.Bot.Prefix)) return;
    const [cmd, ...args] = message.content.slice(client.config.Bot.Prefix.length).trim().split(" ");
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases ?.includes(cmd.toLowerCase()));

    if (!command) return;

    if (command.ownerOnly) {
      if (message.author.id !== client.config.Role) {
        return message.reply({ content: client.i18n.get(language, "message", "owner_only"), allowedMentions: { repliedUser: false } });
      }
    }

    await command.run(client, message, args, language);
  }
}
