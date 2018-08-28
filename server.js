const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const server=express();
server.use(express.json());
server.use(cors());

const formattedDate = () => {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

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
        .then(post => res.status(201).json(post[0]))
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

//delete selected post, return deleted post
server.delete('/api/posts/:id', (req, res)=> {
  db.findById(req.params.id)
    .then(post => {
      db.remove(req.params.id)
        .then(response => {
          if(response < 1){
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
          }else if (response === 1){
            return res.status(201).json(post[0])
          }else{
            return res.status(500).json({ error: "Something REALLY screwed up" })
          }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }));
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed" }));
});

//requires title-contents, updates post in db
//returns newly created posts
//added in updated timestamp
server.put('/api/posts/:id', (req, res)=> {
  const { title, contents } = req.body;
  if(!title || !contents){
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }

  db.update(req.params.id, ({ title, contents, updated_at: formattedDate() }))
    .then(response=> {
      if(response < 1){
        res.status(404).json({ error: "The post with the specified ID does not exist." });
      }else{
        db.findById(req.params.id)
          .then(post => res.status(201).json(post[0]))
          .catch(err => res.status(500).json({ error: "The post information could not be modified."}))
      }
    })
    .catch(err=> res.status(500).json({ error: "The post information could not be modified."}));
});


server.listen(3333, ()=> console.log('API running on port 3333'));
