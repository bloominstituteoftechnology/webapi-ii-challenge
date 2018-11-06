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
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'The posts information could not be retrieved.' });
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    post.length > 0
      ? res.status(200).json(post)
      : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
  } catch (err) {
    res.status(500).json({ error: 'The post information could not be retrieved.' });
  }
});

server.post('/api/posts', async (req, res) => {
  if (req.body.title && req.body.contents) {
    try {
      const addedPost = await db.insert(req.body);
      const post = await db.findById(addedPost.id);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    }
  } else {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
});

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    count
      ? res.status(200).json({ message: 'Successfully deleted post.' })
      : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
  } catch (err) {
    res.status(500).json({ error: 'The post could not be removed.' });
  }
});

server.put('/api/posts/:id', async (req, res) => {
  if (req.body.title && req.body.contents) {
    try {
      const count = await db.update(req.params.id, req.body);
      if (count) {
        const post = await db.findById(req.params.id);
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'The post information could not be modified.' });
    }
  } else {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
});

server.listen(port, () => console.log(`Server running on port ${port}.`));
