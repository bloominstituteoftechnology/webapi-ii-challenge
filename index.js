// import your node modules
const db = require('./data/db.js');
const cors = require('cors');

const express = require('express');
const server = express();
server.use(cors());
server.use(express.json());
// add your server code starting here
console.log('hello');

server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: " error: 'The posts information could not be retrieved'", error: error });
  }
});

server.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let foundPostId = await db.findById(id);
    {
      foundPostId.length
        ? res.status(200).json(foundPostId)
        : res.status(404).json({ error: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The post information could not be retrieved.' });
  }
});

server.post('/api/posts/', async (req, res) => {
  console.log(req.body);
  const userPostData = req.body;
  if (!userPostData.title || !userPostData.contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  } else {
    try {
      const newPost = await db.insert(userPostData);
      res.status(201).json(newPost);
    } catch (error) {
      console.log('There was an error while saving the post to the database. The error is ', error);
      res.status(500).json({ error: 'There was an error while saving the post to the database. The error is ', error });
    }
  }
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.remove(id)
    .then(deletedPost => {
      deletedPost
        ? res.status(202).json({ message: 'Post removed' })
        : res.status(404).json({ message: 'The Post with the specified ID does not exist.' });
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed.' });
    });
});

server.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    if (!changes.title || !changes.contents) {
      res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    } else {
      const foundPost = await db.findById(id);
      if (!foundPost) {
        res.status(404).json({ message: `error: The post with the specified ID does not exist.` });
      } else {
        const count = await db.update(id, changes);
        res.status(200).json({ message: `${count} users updated` });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be updated.' });
  }
});

server.listen(9000, () => console.log('the server is alive!'));
