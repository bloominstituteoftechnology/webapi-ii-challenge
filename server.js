// import your node modules
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('API running');
});

// GET request to /api/posts
server.get('/api/posts', (req, res) => {
 db
  .find()
 .then(posts => {
   res.json(posts);
 })

 // do something with the error
 .catch(err => {
   res.status(500).json({ error: err });
 });
});

// GET request to /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
  // grab the id from URL params
  const id = req.params.id;

  db
  .findbyID(id)
  .then(posts => {
    if (posts.length === 0) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
      res.json(posts[0]);
    }
  })
})

// If retrieval error from database
.catch(err => {
  res.status(500).json({ error: 'The posts information could not be retrieved.' });
})

// POST request to /api/posts
server.post('/api.posts', (req, res) => {
  const{title, contents} = req.body;
  const postNew = {title, contents}
  // console.log(req);
  if (title.lenght === 0 || contents.length === 0) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
  } else
  db
  .insert(postNew)
  .then(post => {
    res,status(201).json(post);
  })
  // If retrieval error from database
  .catch(err => {
    res.status(500).json({ error: 'There was an error while saving the post to the database.'})
  })
});
