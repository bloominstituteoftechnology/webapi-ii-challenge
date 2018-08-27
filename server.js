// import your node modules
const express = require('express');

const server = express();

const db = require('./data/db.js');

// add your server code starting here

const newPost = {
  title: "How can yeh have any pudding...",
  contents: "If yeh won't eat yer meat!"
};

server.use(express.json());

server.get('/api/posts', (req, res) => {
  db.find().then(posts => {
    res.status(200).json(posts)
  }).catch(err => {
    console.error('error', err);

    res.status(500).json({ error: "The posts information could not be retrieved."})
  })
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(parseInt(req.params.id)).then(post => {
    console.log(post);
    if (post.length === 0) {
      res.status(404).json({  message: "The post with the specified ID does not exist." });
    }
    else {
      res.status(200).json(post)
  }}).catch(err => {
    console.error('error', err);

    res.status(500).json({ error: "The post information could not be retrieved."})
  })
});

server.post('/api/posts', (req, res) => {
  db.insert(newPost).then().catch()
})

server.listen(3000, ()=>console.log('Hello!'))
