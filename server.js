const express = require('express');
const db = require('./data/db.js');
const server = express();

/* Middleware */

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  next();
});

/* DB fetching */

// helper func to return posts after any sort of update
const fetchPosts = (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
};

server.get('/posts', fetchPosts);

server.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: `The post with an id of ${id} does not exist.` });
      }
      else res.status(200).json(post);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' }).end();
  }
  const post = { title, contents };
  db.insert(post)
    .then(() => {
      db.find()
        .then(posts => res.status(201).json(posts))
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'There was an error indexing and/or finding the post.' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    });
});

server.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: `The post with an id of ${id} does not exist.` });
      } else {
        db.remove(id)
          .then(() => {
            fetchPosts(req, res);
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'The post could not be removed.' });
          });
        }
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({ message: `The post with an id of ${id} does not exist.` });
    });
});

server.put('/posts/:id', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' }).end();
  }
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: `The post with an id of ${id} does not exist.` });
      } else {
        db.update(id, { title, contents })
          .then(() => {
            fetchPosts(req, res);
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'The post information could not be modified.' });
          });
        }
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({ message: `The post with an id of ${id} does not exist.` });
    });
});

/* Listener */

server.listen(3333, () => 'server listening on port 3333');
