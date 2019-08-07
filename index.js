const express = require('express');
const server = express()

const channelsRouter = require('./channels/channels-router.js');

server.use(express.json());

server.get('/', (req, res) => {
  const queryParameters = req.query
  console.log(queryParameters)
  res.send('SUCCESS!')
})

server.use('/api/posts', channelsRouter)

const port = 9000;
server.listen(port, () => console.log('api running'));