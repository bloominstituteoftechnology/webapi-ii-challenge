/* Environment variables */
require('dotenv').config()

/* Express */
const express = require('express')
const { port } = require('./config/config.js')

const server = express()

server.use(express.json())

/* Routes */
server.use('/', require('./api/routes'))

server.listen(port, () => console.log(`🤖 Server up and runnning on port ${port} 🤖`))