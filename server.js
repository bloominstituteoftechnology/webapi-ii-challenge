// import your node modules
const express = require('express')
const db = require('./data/db.js')
const server = express()
// const nodemon = require('nodemon')

server.use(express.json())

// middleware
const cors = require('cors')

//set up cors for port 3000 which is for react-redux
server.use(cors({
  origin: 'http://localhost:3000'
}));

//port variable
const port = 5000



// methods
const errorMessage = (status, message, res) => {
  res.status(status).json({
    errorMessage: message
  })
  return;
}

// add your server code starting here
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
      errorMessage(500, 'The posts could not be found!', res)
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const {
    id
  } = req.params;
  let post;

  db
    .findById(id)
    .then(post => {
      if (post.length === 0) {
        errorMessage(404, 'The post with this ID does not exist. Could not delete.', res);
        return;
      }
      res.json(post);
    })
    .catch(error => {
      errorMessage(500, 'something went wrong!', res);
    });
})

server.get('/api/posts/:id', (req, res) => {
  const {
    id
  } = req.params;

  db
    .findById(id)
    .then(post => {
      if (post.length === 0) {
        errorMessage(404, 'The post with this ID does not exist.', res);
        return;
      }
      res.json(post);
    })
    .catch(error => {
      errorMessage(500, 'something went wrong!', res);
    });
});

server.put('/api/posts/:id', (req, res) => {
  const {
    id
  } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(post => {
      if (post > 0) {
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