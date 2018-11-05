/*--- import your node modules ---*/
const express = require('express');
const cors = require('cors');

/*--- file imports, constants ---*/
const db = require('./data/db.js');
const port = 5000;

const server = express();

/*--- server middleware ---*/
server.use(express.json());
server.use(cors());

/*--- request handlers ---*/
server.get('/api/posts', async (_, res) => {
  const posts = await db.find();
  res.status(200).json(posts);
});

server.listen(port, () => console.log(`Server running on port ${port}.`));
