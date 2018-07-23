const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data/db');

const server = express();
// turn on the body parser, using JSON data
server.use(bodyParser.json());
const PORT = 8000;

// res.status(200).json(hobbits);

server.get('/api/posts', (req, res) => {
  data
    .find()
    .then(response => res.json(response))
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' }),
    );
});

server.post('/api/users', (req, res) => {
  const user = req.body.user;
  if (!user) {
    res.status(422).json({ error: 'must supply a user' });
  }
});

server.listen(PORT, console.log(`Server listening on port ${PORT}`));
