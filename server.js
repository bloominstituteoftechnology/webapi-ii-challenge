// import your node modules
const express = require('express');
// const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('./data/db.js');

const server = express();

server.use(express.json());
// server.use(helmet());
server.use(morgan('dev'));
// server.use(bodyParser.json());

let posts = [];
let idCounter = 0;
server.post('/api/posts', (req, res) => {
  const { id, title, contents } = req.body;
  db.insert(posts);

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    const newPosts = { idCounter, title, contents };
    posts.push(newPosts);
    res.status(201).json(posts);
  }
});

server.get('/', (req, res) => {
  res.json({ Api: 'running' });
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    res.json(post);
  });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(404)
      .json({ message: 'The post with the specified id does not exist' });
  }
  db
    .remove(id)
    .then(() => {
      res.json({ message: 'success' });
    })
    .catch(error => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
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
          .json({ message: 'the user with that id does not exist' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
const port = 5000;
server.listen(port, () => console.log('api running on 5000'));
