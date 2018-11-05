/*--- import your node modules ---*/
const express = require('express');
const cors = require('cors');

/*--- file imports, constants ---*/
const db = require('./data/db.js');
const port = 5000;

const server = express();

/*--- server middleware ---*/
server.use(express.json());
server.use(cors());

/*--- request handlers ---*/
server.get('/api/posts', (_, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(
      post =>
        post.length > 0
          ? res.status(200).json(post)
          : res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    )
    .catch(err => {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
    db.insert(req.body)
      .then(res => db.findById(res.id).then(post => res.status(201).json(post)))
      .catch(err =>
        res.status(500).json({ error: 'There was an error while saving the post to the database' })
      );
  } else {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(
      post =>
        post
          ? res.status(200).send('You sucessfully deleted the post.')
          : res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    )
    .catch(err => res.status(500).json({ error: 'The post could not be removed' }));
});

server.listen(port, () => console.log(`Server running on port ${port}.`));
