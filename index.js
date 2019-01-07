// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
    db.find()
      .then(posts => {
          res.json(posts);
      })
      .catch(err => {
        res.json(err);
      });
});

server.get('/api/posts/:postid', (req, res) => {
    const id = req.params.postid;
  
    db.findById(id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist."});
        }
      })
      .catch(err => res.status(500).json({error: "The post information could not be retrieved." }));
  });

server.listen(5000, () => console.log('Server is running'));