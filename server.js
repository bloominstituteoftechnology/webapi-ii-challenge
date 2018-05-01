const express = require('express');
const helmet = require('helmet');

// import db 
const db = require('./data/db');

const server = express();

// middleware
server.use(express.json());
server.use(helmet());

// route handlers 



// POST post
server.post('/api/posts', (req, res) => {
  const postBody = req.body;
  console.log('post body', postBody);

  db
    .insert(postBody)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => { 
      if (err.errno === 19) {
        res.status(400).json({ Message: "Please provide title and contents for the post."  });
      } else {
        res.status(500).json({ error: err });
      }
    });
  });


// GET posts

// resolve '/'
server.get('/', (req, res) => {
  res.send('Api running');
})

// Get posts
server.get('/api/posts', (req, res) => {
  db.find().then(posts => {
    res.json(posts);
  }).catch(err => { 
    res.end(500).json({ error: 'The post information could not be retrieved.' });
  });
});

// GET posts by ID
server.get('/api/posts/:id', (req, res) => {
 const id = req.params.id;

db
  .findById(id)
  .then(posts => {
    if (posts.length === 0) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
    res.json(posts[0]);
    }
  })
  .catch(err => { 
    res.status(500).json({ error: "The post information could not be retrieved." });
  });
});

// DELETE posts by ID
server.delete('/api/users', function(req, res) {
  const { id } = req.query;
  let user;
  db
    .findById(id)
    .then(foundUser => {
      user = { ...foundUser[0] };

      db.remove(id).then(response => {
        res.status(200).json(user);
      });
    })   
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// PUT 
server.put('/api/post/:id', function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(users => {
          res.status(200).json(users[0]);
      });
    } else {
      res.status(404).json({ msg: 'user not found' });
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));



