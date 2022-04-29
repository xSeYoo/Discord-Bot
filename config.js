require("dotenv").config();
const { resolve } = require("path");

module.exports = {
  color: "A85CF9 ", 
  Role: {
    Dev: "733641546351771668",
    Admin: ""
  },
  Bot: {
    ClientID: "964393809398071368",
    Prefix: "+"
  },
  Embed: {
    Color: "	#8A2BE2",
    Copyrigth: "Discord.js v13 by Daffa Rasendriya#0001",
    Icon: "https://cdn.discordapp.com/icons/941003548970352660/a_9fa2510633957eb199083ee73f616051.gif?size=1024",
    Wrong: "FF0000"
  },
  LANGUAGE: {
      defaultLocale: process.env.LANGUAGE || "en", // "en" = default language
      directory: resolve("languages"), // <= location of language
    },
}