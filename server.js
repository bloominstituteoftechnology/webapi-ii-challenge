// import your node modules
const express = require('express');
// const bodyParser = require('body-parser'); --> not needed now that we have server.use(express.json());
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

//middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json()); // this replaces the need for bodyParser
// server.use(bodyParser.json()); --> wave goodbye to bodyParser
server.use(cors(corsOptions));

// -------- POST -----------
server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const post = {
    title,
    contents
  }
  if (!title || !contents) { // base case. If no title or no contents, return 400 error
    return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  }
  db
    .insert(post)
    .then(response => {
      res.status(201).json(response); // all this returns is the id. Should we be returning the title + contents from it too?
    })
    .catch(error => {
      res.status(500).json({error: "There was an error while saving the post to the database."});
    });
});

// -------- GET ----------
// server.get('/', (req, res) => {
//   res.send({ api:'Running...'});
// });

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({error: "The posts information could not be retrieved."});
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(posts => {
      if (!posts[0]) {
        res.status(404).json({message: 'The post with the specified ID does not exist.'});
      }
      res.json(posts[0]);
    })
    .catch(error => {
      res.status(500).json({error: "The post information could not be retrieved."});
    });
});

// ---------- DELETE ----------
// if post not found, return 404 + message "The post with the specified ID does not exist."
// if error when removing, return 500 + error "The post could not be removed."
// if successful, return 200 with the post that was deleted
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  let post;

  db
  .findById(id)
  .then(response => {
    if (!response[0]) {  
      res.status(404).json({message: 'The post with the specified ID does not exist.'});
    }
    post = { ...response[0] };

    db
    .remove(id)
    .then(response => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error:"The post could not be removed." });
    })})
  .catch(error => {
    res.status(500).json(error);
  });
});

// ---------- PUT ----------
// if post not found, return 404 + message "The post with the specified ID does not exist."
// if request is missing title or contents, cancel, respond with 400 + "please provide title and contents for the post."
// if error when updating, return 500 + error "The post could not be modified."
// if successful, return 200 with the new post
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const post = {
    title,
    contents
  }

  if (!title || !contents) {
    return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  }
  db
    .update(id, post)
    .then(post => {
      if (post === 0) {
        res.status(404).json({message: 'The post with the specified ID does not exist.'});
      }
      db
      .findById(id)
      .then(updatedPost => {
        res.status(200).json(updatedPost[0]);
      })
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be modified"})
    })
});

const port = 5001;
server.listen(port, () => console.log('API running on port 5001'));
