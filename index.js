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
    } else {
        // If we're in a guild, look for a command
        switch (msg.content) {
            // Join a voice channel if the user is already in a channel
            case '!join':
                if(msg.member.voice.channel) {
                    connection = await msg.member.voice.channel.join()
                } else {
                    msg.reply('You need to join a voice channel first!')
                }
                break;
            // Play audio in a channel that has been joined
            case '!play':
                const dispatcher = connection.play(path.join(__dirname, 'music/underdog.mp3'))
                dispatcher.on('finish', () => {
                    msg.reply('Finished playing')
                    dispatcher.destroy()
                })
                break;
            // Close the connection to whatever voice channel the bot is currently on.
            case '!leave':
                connection.disconnect()
                break
        }
    }
})