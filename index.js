const express = require('express');
const cors = require('cors');
const postRouter = require('./data/router.js')

const server = express();
const port = 4000;

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`
  <h1>webapi-ii-challenge</h1>
  `);
});

server.use('/api/posts', postRouter);

server.listen(port, () => console.log(`Server is listening on port ${port}`));