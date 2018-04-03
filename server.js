// import your node modules
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(bodyParser.json());
// -------- GET ----------
server.get('/', (req, res) => {
  res.send({ api:'Running...'});
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({error: 'The posts information could not be retrieved.'});
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res.status(404).json({error: 'The post with the specified ID does not exist.'});
    });
});

// -------- POST -----------
server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const post = {
    title,
    contents
  }
  if (!title || !contents) {
    return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  }
  db
    .insert(post)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// ---------- DELETE ----------
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: 'The post with the specified ID does not exist.'})
  }
  db
    .remove(id)
    .then(() => {
      res.json({message: 'Success'})
    })
    .catch(error => {
      res.status(500).json({ error:"The post could not be removed."})
    });
  });
// ---------- PUT ----------
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const post = {
    title,
    contents
  }
  if (!id) {
    return res.status(404).json({ message: 'The post with the specified ID does not exist.'})
  } 
  if (!title || !contents) {
    return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  }
  db
    .update(id, post)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be modified"})
    })
});

const port = 5001;
server.listen(port, () => console.log('API running on port 5001'));
