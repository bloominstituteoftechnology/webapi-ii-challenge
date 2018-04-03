// import your node modules
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(bodyParser.json());


server.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => res.json(posts))
  .catch(error => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  });
});


server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  
  db.findById(id)
  .then(posts => {
    // console.log(posts); why I can't log this? 
    if (posts.length) {
      res.json(posts[0]);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be retrieved." });
  });
});


server.post('/api/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  
  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    return;
  }
  
  db.insert(req.body)
  .then(post => {
    res.status(201).json(req.body);
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  });
});



server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  let post;
  
  db.findById(id)
  .then(response => {
    post = { ... response[0] }
    
    db.remove(id)
    .then(response => {
      if (response) {
        res.json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
    
  })
  .catch(error => {
    res.status(500).json({ error: "The post could not be removed" });
  });
  
});



server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  const contents = req.body.contents;
  
  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  
  db.update(id, req.body)
  .then(post => {
    if (post) {
      res.json(req.body);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be modified." });
  });
  
});



const port = 5000;
server.listen(port, () => console.log('server running on port 5000'));