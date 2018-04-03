// import your node modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const db = require('./data/db.js');

const server = express();

// const corsOptions = {
//   origin: '*',
//   methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// };

server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
// add your server code starting here
server.get('/', (req, res) => {
  res.send({ api: 'Running...' });
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length < 1) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
      res.json(post[0]);
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

server.post('/api/posts', (req, res) => {
  const post = req.body;
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  db.insert(post)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post => {
     
      res.json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  db.update(id, post)
    .then(post => {
      if (post === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be modified." });
    });
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
