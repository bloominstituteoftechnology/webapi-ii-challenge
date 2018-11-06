// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Requests
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved', err })
    );
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (!post.length) {
        res.status(404).json({ message: 'That post does not exist' });
      } else {
        res.status(200).json({ ...post[0] });
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an error', err }));
});

server.post('/api/posts', async (req, res) => {
  const postData = req.body;
  try {
    if (!postData.title || !postData.contents) {
      res
        .status(400)
        .json({ message: 'Please provide title and contents for the post.' });
    } else {
      const post = await db.insert(postData);
      res.status(201).json(post);
    }
  } catch (error) {
    console.log(postData);
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

server.listen(4000, () => console.log('Server started on port 4000'));
