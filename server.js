// import your node modules
const express = require('express')
const db = require('./data/db.js')
const server = express()
// const nodemon = require('nodemon')

server.use(express.json())

// middleware
const cors = require('cors')

const port = 5000
// add your server code starting here

// methods
const errorMessage = (status, message, res) => {
  res.status(status).json({
    errorMessage: message
  })
  return;
}

server.get('/', (req, res) => {
  res.send('server is running...')
})

server.post('/api/posts', (req, res) => {
  const {
    title,
    contents
  } = req.body;
  db
    .insert({
      title,
      contents
    })
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
})

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json({
        posts
      });
    })
    .catch(error => {
      errorMessage(500, 'The post could not be found!', res)
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const {
    id
  } = req.params;
  let post;

  db
    .findById(id)
    .then(response => {
      post = { ...response[0]
      };

      db.remove(id)
        .then(response => {
          res.status(200).json(post);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

server.get('/api/posts/:id', (req, res) => {
  const {
    id
  } = req.params;

  db
    .findById(id)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.put('/api/posts/:id', (req, res) => {

  const {
    id
  } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(updatedPosts => {
          res.status(200).json(updatedPosts[0]);
        });

      } else {
        res
          .status(404)
          .json({
            message: 'The post with the specified ID does not exist.'
          });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.listen(5000, () => console.log(`server is running on port ${port}`))