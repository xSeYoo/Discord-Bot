module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {
        
        // Puts an activity
        client.user.setActivity("Daffa Rasendriya#0001", {
            type: "WATCHING",
            name: "Daffa Rasendriya#0001"
        });
        
        // Send a message on the console
        console.log(`[LOG] ${client.user.tag} is now online!\n[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers\n[LOG] Bot serving ${client.users.cache.size} users`);
    }
}
