// import your node modules
const express = require('express')
const db = require('./data/db.js');
const port = 3334
const server = express()
server.use(express.json())
// add your server code starting here
server.get('/', (req,res) => res.send('<h1>sup</h1>'))




server.listen(port,()=> console.log(`I hear you ${port}`))