// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');
const PORT = 4001;
const parser = express.json();
server.use(parser);
// add your server code starting here
server.get('/api/posts', (request, response) => {
  db.find()
    .then((posts) => {
      response.json(posts)
    })
    .catch((err => {
      res.json({ error: "The posts information could not be retrieved." }.status(500))
    }));
});

server.get('/api/posts/:id', (request, response) => {
  const { id } = request.params;
  db.findById(id)
    .then((post => {
      if (post) {
        response.json(post);
      }
      else {
        response.status(404).json({ error: 'cannot find a post with that ID' });
      }
    }))
    .catch(err => {
      response.status(500).json({ error: 'failed to get post' })
    });
});

server.post('/api/posts', (req, res) => {
  const post = req.body;

  if (post.title && post.contents) {
    db.insert(post).then(idInfo => {
      db.findById(idInfo.id).then(post => {
        res.status(201).json(post);
      });
    }).catch(err => {
      res.status(500).json({ message: "failed to insert post in database" });
    });
  } else {
    res.status(400).json({ message: "missing title or contents" })

  }
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id).then(count => {
    if (count) {
      res.json({ message: "succesfully deleted" })
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist" })
    }
  }).catch(err => {
    res.status(500).json({ message: "failed to delete post" })
  });
})

server.put('/api/posts/:id', (req, res) => {
  const post = req.body;
  const { id } = req.params;

  if (post.title && post.contents) {
    db.update(id, post).then(count => {
      if (count) {
        db.findById(id).then(post => {
          res.json(post)
        });

      } else {
        res.status(500).json({ message: "failed to edit post" });

      }
    });
  } else {
    res.status(400).json({ message: "missing title or contents" })
  }
})


server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`)
})