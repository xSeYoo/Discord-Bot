const Command = require('../../Handlers/Command.js')

module.exports = new Command({

    name: 'dm-all',
    description: 'Send a message to all users',
    owner: true,
    userPermissions: '',
    botPermissions: 'ADMINISTRATOR',
    cooldown: 4000,
    type: "Text"

    run: async(interaction, args, client) => {

        const messageQuery = args.slice(1).join(" ")
        if(!messageQuery) messageQuery = 'sorry you got this message, it was unitentional. \n By Sensei | 旭陽#2827'
        try{
            await message.guild.members.cache.forEach(async (user) => {
           user.send(`${messageQuery}`)
           if (user.bot) return
           })
           }catch (error){
             console.log(error)
            }
            return message.channel.send(`I have sent a message to all users who have dms enabled.`)

    }
})
