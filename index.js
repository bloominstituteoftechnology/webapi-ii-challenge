// import your node modules

const db = require('./data/db.js');
const express = require('express');
const PORT = 9000;


// add your server code starting here

const server = express();

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      console.log(posts);
      const formatedPosts = posts.map( (post) => ({ 
        title: post.title, 
        contents: post.contents 
      }));
      console.log(formatedPosts);
      res.status(200).json(formatedPosts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    })
});

server.listen(PORT, () => console.log('Server is running on port: ' + PORT));

