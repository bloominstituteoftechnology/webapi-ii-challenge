const express = require('express');

const server = express();

server.use(express.json());

//middleware
const dbRouter = require('./data/db-router.js');

server.use(express.json());

server.use('/api/posts', dbRouter);



//endpoints
server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda WEP API II Challenge :)</h>
      <p>Blogposts</p>
    `);
  });

const port = 6000;
server.listen(port, () => {
    console.log(`\n** Server listening on ${port}`)
})