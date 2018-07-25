const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

const notRetrieved = "The information could not be retrieved.";
const notFound = "The post with the specified ID does not exist.";
const incompleteForm = "Please provide title and contents for the post.";
const saveError = "There was an error while saving the post to the database";
const editError = "The post information could not be modified.";

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Home page');
})

server.post('/api/posts', async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: incompleteForm });
  }
  try {
    const { id } = await db.insert(req.body);
    try {
      const post = await db.findById(id);
      res.status(201).json(post);
    } catch (error) {
      return res.status(404).json({ error: notFound });
    }
  } catch (error) {
    res.status(500).json({ error: saveError });
  }
});

server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: notRetrieved });
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length === 0) {
      return res.status(404).json({ message: notFound });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: notRetrieved })
  }
});

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.remove(req.params.id);
    if (post === 0) {
      return res.status(404).json({ message: notFound });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" })
  }
});

server.put('/api/posts/:id', async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: incompleteForm });
  }
  try {
    await db.update(req.params.id, req.body);
    try {
      const post = await db.findById(req.params.id);
      if (post.length === 0) {
        return res.status(404).json({ message: notFound });
      } else {
        return res.status(200).json(post);
      }
    } catch (error) {
      return res.status(500).json({ error: notRetrieved });
    }
  } catch (error) {
    return res.status(500).json({ error: editError });
  }
});

server.listen(8000, () => console.log("API running"));
