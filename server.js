// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

//add middleware
server.use(express.json());

server.post('/api/posts', (req, res) => {
  const postInformation = req.body;
  if (!postInformation.title || !postInformation.contents) {
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }

  db
    .insert(postInformation)
    .then(response => {
      db.findById(response.id).then(post => {res.status(201).json(post);}).catch(err => {res.status(500).json({ error: err });});
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database." });
    });
})

server.delete('/api/posts', function(req, res) {
  const { id } = req.query;
  let post;

  db
    .findById(id)
    .then(foundPost => {
      if (foundPost.length > 0) {
        post = { ...foundPost[0] };
        db.remove(id).then(response => {res.status(200).json(post);}).catch(err => {res.status(500).json({ error: err });});
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
})

server.put('/api/posts/:id', function(req, res) {
  const { id } = req.params;
  const update = req.body;

  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }

  db
    .update(id, update)
    .then(count => {
      if(count > 0) {
        db.findById(id).then(posts => {
          res.status(200).json(posts[0]);
        });
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be modified." });
    });
})

server.get('/', (req, res) => {
  res.send('Api is running!');
})

server.get('/api/posts', (req, res) => {
  //get the posts
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    });

  //return the posts
})

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(post => {
      console.log(post);
      if (post.length > 0) {
        res.json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    });

})

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'))
