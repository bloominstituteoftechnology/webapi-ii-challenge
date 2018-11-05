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
server.get('/api/posts', (_, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(() => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(
      post =>
        post.length > 0
          ? res.status(200).json(post)
          : res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    )
    .catch(() => {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
});

server.listen(port, () => console.log(`Server running on port ${port}.`));
