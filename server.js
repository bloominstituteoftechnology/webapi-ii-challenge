// import your node 
const express = require('express');

const server = express();

const db = require('./data/db.js');

// add your server code starting here

const newPost = {
  title: "Node",
  contents: "Check me out"
};
server.use(express.json());
server.get('/api/posts', (req, res) => {
  db.find().then(posts => {
    res.status(200).json(posts)
  }).catch(err => {
    console.error('error', err);
    res.status(500).json({ error: "Can't get posts"})
  })
});
server.get('/api/posts/:id', (req, res) => {
  db.findById(parseInt(req.params.id)).then(post => {
    console.log(post);
    if (post.length === 0) {
      res.status(404).json({  message: "Bad post ID" });
    }
    else {
      res.status(200).json(post)
  }}).catch(err => {
    console.error('error', err);
    res.status(500).json({ error: "Can't get posts"})
  })
});
server.post('/api/posts', (req, res) => {
  db.insert(newPost).then().catch()
})
server.listen(3000, ()=>console.log('Testing'))