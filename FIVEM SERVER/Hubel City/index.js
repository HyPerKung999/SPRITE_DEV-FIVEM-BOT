const {Client, GatewayIntentBits} = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

client.on('ready', ()=>{
    console.log('BOT ONLINE!!!')
})

client.login(process.env.Token);