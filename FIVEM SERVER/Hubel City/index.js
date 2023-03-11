require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const CheckServerID = require("./function/CheckServerID");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

module.exports = client;

client.on("ready", () => {
  console.log("BOT ONLINE!!!");
});

client.login(process.env.Token_1 + process.env.Token_2);

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  } else {
    CheckServerID(message);
  }
});

// Collection
client.messageCommands = new Collection();
client.aliase = new Collection();
client.slashCommands = new Collection();
client.events = new Collection();

require("./handle")(client);