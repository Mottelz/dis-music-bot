// Package setup
require('dotenv').config()
const Discord = require('discord.js')
const client = Discord.Client()

// Launch the client
client.login(process.env.token)