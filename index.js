const express = require('express')
const posts = require('./routes/posts')

const server = express()
// Allows us to parse the request body
server.use(express.json());

server.use('/api/posts', posts)

server.listen(4000, () => {
  console.log('Server is listening on port 4000')
})

