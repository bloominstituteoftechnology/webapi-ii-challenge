// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());
// add your server code starting here
server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id).then((post) => {
    if (post.length) {
      console.log('If true', post);
      res.status(200).json({ post: post });
    } else {
      console.log('If flaes', post);
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  });
});

server.post('/api/posts', async (req, res) => {
  console.log('BODY', req);
  const postData = req.body;
  try {
    const postId = await db.insert(postData);
    const post = await db.findById(postId.id);
    res.status(201).json(post);
  } catch (err) {
    let message = 'error creating post';
    if (err.errno === 19) {
      message = 'Please provide title and contents for the post.';
    }
    res.status(400).json({ message, err });
  }
});
})
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((count) => {
      console.log(count);
      if (count) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'The post could not be removed.', err });
    });
});

server.listen(9000, () => {
  console.log('Server is up on 9000!');
});
