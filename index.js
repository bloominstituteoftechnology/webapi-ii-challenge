// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
var cors = require('cors');

server.use(cors());
server.use(express.json());

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The posts information could not be retrieved.",
          error: err
        });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The post information could not be retrieved.",
          error: err
        });
    });
});

server.post('/api/posts', async (req, res) => {
  if(!req.body.title || !req.body.contents){
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  try {
    const postData = req.body;
    const userId = await db.insert(postData);
    res.status(201).json(userId);
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database",
      error
    })
  }
})

server.put('/api/posts/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db.update(id, changes).then(count =>
    res.status(200).json(count)
  ).catch(error => {
    res.status(500).json({
      message: 'error updating post',
      error
    })
  })
})

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id).then(count => {
    res.status(200).json(count)
  }).catch(error => {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
      error
    })
  })
});
server.listen(9000, () => console.log('\nthe server is alive!\n'));