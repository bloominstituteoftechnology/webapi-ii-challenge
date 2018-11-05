// import your node modules
const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db.js');

// add your server code starting here

server.get('/users', async (req, res) => {
  try {
    const response = await db.find();
    res.status(200).json(response);
  } catch {
    res.status(400).json({ message: 'not accessible' });
  }
});

server.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  if (res.length > 0) {
    try {
      const response = await db.findById(id);
      res.status(200).json(response);
    } catch {
      res.status(404).json({ message: 'user is not found' });
    }
  } else {
    res.status(404).json({ message: 'cant find the user' });
  }
});

server.post('/users', async (req, res) => {
  const user = req.body;
  if (user.title && user.contents) {
    try {
      const response = await db.insert(user);
      res.status(201).json(response);
    } catch {
      res.status(500).json({ message: 'Error getting data' });
    }
  } else {
    res.status(422).json({ message: 'A needs a title and content' });
  }
});

server.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (user.title && user.contents) {
    try {
      const response = await db.update(id, user);
      res.status(200).json(response);
    } catch {
      res.status(404).json({
        message: 'Needs a title and a content'
      });
    }
  } else {
    res.status(422).send('cannot be processed');
  }
});

server.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.remove(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

server.listen(9000, () =>
  console.log('\n == server listening on port 9000 ==\n')
);
