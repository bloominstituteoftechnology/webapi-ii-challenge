// import your node modules
const express = require('express')
const server = express()
const db = require('./data/db')
const cors = require('cors')

// add your server code starting here
server.use(cors())
server.use(express.json())

