// import your node modules
const express = require('express');
const indexRouter = require('./routes/index')

// add your server code starting here
const server = express()

server.use(express.json())
server.get('/', (req, res) => {res.send('Running')})
server.use('/api/posts', indexRouter)

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));