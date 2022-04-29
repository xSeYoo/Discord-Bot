module.exports = {
  name: "test",
  description: "testing command",
  ownerOnly: true,
  run: async(client, message, args, language) => {
    let member = args[0] || message.author;



message.channel.send(`${member}`); //sends the activities
  }
}