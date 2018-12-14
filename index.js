// import your node modules

const express = require('express')

const cors = require('cors')

const server = express()

server.use(server.json(), cors())

const db = require('./data/db.js');

// add your server code starting here
