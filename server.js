const express = require('express');
// const postsRouter = require('./hubs/hubs-router');
const server = express();

server.use(express.json());
// server.use('/api/db', postsRouter)

server.get('/', (req, res) => {
  res.send(`
    <h2>API Working</h>
    
  `);
});


module.exports = server