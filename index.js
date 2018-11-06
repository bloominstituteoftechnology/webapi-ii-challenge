// import your node modules

const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// add your server code starting here

server.get('/', (req, res) => {
    res.json('active');
});

server.get('/api/posts', (req, res) => {
    db.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The posts information could not be retrieved.", error: err });
      });
  });
  
  server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
  
    db.findById(id)
      .then(post => {
        if (post && post.length) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The post information could not be retrieved.", error: err });
      });
  });

  server.post('/api/posts', async (req, res) => {
    console.log('body', req.body);
    try {
      const postData = req.body;
      const postId = await db.insert(postData);
      const post = await db.findById(postId.id);
      res.status(201).json(post);
    } catch (error) {
      let message = 'error creating the user';
  
      if (error.errno === 19) {
        res.status(400).json({ message: 'please provide both the name and the bio'});
      } else {
        res.status(500).json({ message, error });
      }
    }
  });

  server.delete('/api/posts/:id', (req, res) => {
    //const { id } = req.params;
    db.remove(req.params.id)
      .then(count => {
        if (count) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'error deleting user', err });
      });
  });


server.listen(9000, () => console.log('the server is active'));