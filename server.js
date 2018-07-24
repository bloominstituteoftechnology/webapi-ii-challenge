const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Home page');
})

server.post('/api/posts', async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  try {
    const post = await db.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
});

server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    console.log(post);
    if (post.length === 0) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "The post information could not be retrieved." })
  }
});

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.remove(req.params.id);
    console.log(post);
    if (post === 0) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" })
  }
});

server.put('/api/posts/:id', async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  try {
    const post = await db.update(req.params.id, req.body);
    console.log(post);
    if (post === 0) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "The post information could not be modified." });
  }
});

server.listen(8000, () => console.log("API running"));
