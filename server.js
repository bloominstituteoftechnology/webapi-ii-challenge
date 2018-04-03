// import your node modules
const express = require('express');

const server = express();
const bodyParser = require('body-parser');

const db = require('./data/db.js');
server.use(express.json());

server.get('/', function(req, res){
  res.send({api: 'API running...'});
});

server.get('/api/posts', (req, res) => {
  db
  .find()
  .then(posts => {
    res.json(posts);
  })
  .catch(error => {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }); 
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db
  .findById(id)
  .then(posts => {
    if (posts.length > 0) {
      res.json(posts[0])
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  })
  .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    let title = req.body.title;
    let contents = req.body.contents;
    if (!title || !contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.insert(post)
   
    .then(newId => {
        console.log('newId', newId);
        const { id } = newId;
        db.findById(id)
        .then(response => {
          res.status(201).json(response[0]);
        });
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
  });

  server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let post; 
  
    db
      .findById(id)
      .then(response => {
      post = { ...response[0] };
  
      db
      .remove(id)
      .then(response => {
        res.status(200).json(post);
      })
      .catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      });
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
    });
  });

  server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;
  
    db
      .update(id, post) 
      .then(count => {
        if (count > 0) {
          db.findById(id).then(updatedPost => {
            res.status(200).json(updatedPost[0]);
          });  
        } else {
          res
          .status(404)
          .json({ message: 'The user with the specific Id does not exist'});
        }
    })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be modified." });
      });
  });
  


// add your server code starting here
const port = 3000;
server.listen(port, () => console.log('API running on port 3000'));
