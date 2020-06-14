// Package setup
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const path = require('path')

// Launch the client
client.login(process.env.token)

client.on('message', async msg => {
    // If there's no guild, we can't go.
    if(!msg.guild) {
        msg.reply('No guild found.')
    }
    // If there's a guild and the user wants us to join, we try to join
    else {
        switch (msg.content){
            case '!join':
                if(msg.member.voice.channel) {
                    connection = await msg.member.voice.channel.join();
                } else {
                    msg.reply('You need to join a voice channel first!');
                }
                break;
            case '!play':
                const dispatcher = connection.play(path.join(__dirname, 'music/underdog.mp3'))
                dispatcher.on('finish', () => {
                    msg.reply('Finished playing')
                    dispatcher.destroy();
                })
                break;
        }
    }
})