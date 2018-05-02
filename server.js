const express = require('express');
const helmet = require('helmet');
const db = require('./data/db');

const server = express();

// middleware
server.use(helmet());
server.use(express.json());
app.use(cors());

// route handlers 


// POST post
server.post('/api/posts', (req, res) => {
  const post = req.body;

  if(post.title === "" || post.contents === "") {
    res.status(400).json({ error: "Please provide title and contents for the post." });
  } else {
        db
        .insert(post)
        .then(response => {
          res.status(201).json({ post });
        })
        .catch(error => {
          res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
    };
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

// DELETE post
server.delete('/api/posts/:id', function(req, res) {
  const { id } = req.params;
  let post;

  db.findById(id)
    .then(response => {
      post = {...response[0]}; // making a copy of the post so that when post is deleted, the copy is intact and can be returned.
      
      db
        .remove(id)  // deleting the actual post from the database
        .then(response => {
          res.status(200).json(post); // returning the copy of the post we made here, to confirm to the user that this is the record they deleted.
        })
        .catch(error => {
          res.status(500).json({error: "The post could not be removed."});
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// PUT 
server.put('/api/posts/:id', function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if(count > 0) {
        db.findById(id).then(updatedPost => {
          res.status(200).json(updatedPost);
        });
      } else {
        res.status(404)
        .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed." });
    });
});


server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));