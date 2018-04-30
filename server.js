// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
    res.send('API running');
});

server.get('/api/posts', (req, res) => {
//get the posts
 db
 .find()
 .then(posts => {
   res.json(posts);
 })
 .catch(err => {
   res.status(500).json({ error: err });
// do something with the error
 });
});

// /api/posts/123
server.get('/api/posts/:id', (req, res) => {
// grab the id from URL parameters
const id = req.params.id;

db
 .findById(id)
 .then(posts => {
    if (posts.length === 0) {
     res.status(404).json({ message: 'post not found' });
   } else {
     res.json(posts[0]);
   }
 })
 .catch(err => {
// do something with the error
   res.status(500).json({ error: err });
 });
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));
