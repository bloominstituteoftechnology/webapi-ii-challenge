const express = require('express')

const db = require('./data/db.js')

const server = express()
server.use(express.json())


server.post('/api/posts', (req, res) => {
  res.send('Hello')
})


server.listen(4000, () => {
  console.log('Server is listening on port 4000')
})