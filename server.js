const express = require('express');
const db = require('./data/db.js');

const server=express();
server.use(express.json());

//return all posts in db
server.get('/api/posts', (req, res)=> {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }));
});

//get new post data, check that title and contents exist, attempt to save
//success=> return newly created post
//failure=> return error
server.post('/api/posts', (req, res)=> {
  const { title, contents } =  req.body;
  if(!title || !contents){
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  const newPost = { title, contents };
  db.insert(newPost)
    .then(({ id }) => {
      db.findById(id)
        .then(post => res.status(201).json(post))
        .catch(err=> res.status(500).json({ error: "There was an error while saving the post to the database." }));
    })
    .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database." }));
});

//returns post with url param id
server.get('/api/posts/:id', (req, res)=> {
  db.findById(req.params.id)
    .then(post=> {
      post && post.length ? res.status(200).json(post[0]) : res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(err=> res.status(500).json({ message: "The post information could not be retrieved." }));
});



server.listen(3333, ()=> console.log('API running on port 3333'));
