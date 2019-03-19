const express = require('express')
const server = express()
server.use(express.json())
var posts = require('./posts')
server.use('/api/posts', posts)

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);