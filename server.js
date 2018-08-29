const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
server.use(morgan('combined'));
server.use(express.json());



// import your node modules

const db = require('./data/db.js');

// routes

server.get('/', (req, res) => {
  res.send('hello welcome to this channel!')
})

server.get('/api/posts', (req, res) => {
  db.find()
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    res.status(500).json({ error: "The posts information cannot be retrieved"});
  })

server.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  if(id) {
    try {
      const response = await db.findById(id);
      res.status(200).json(response);
    } catch(err){
      res.status(500).json( { message: "The post information could not be retrieved" })
    }
  } else {
    res.status(404).json({ error: "The post with the specified ID does not exist."})
  }
  
})
  
  
})

server.post('/api/posts', async (req, res) => {
  const post = req.body;
  if(post.title && post.contents){
    try{
    const response = await db.insert(post);
    res.status(201).json(response)
  } catch(err){
    res.status(501).json({ message: "cannot create post" });
  }
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post" })
  }
})

server.delete('api/posts/:id', async (req, res) => {
  const { id } = req.params;
  if(id) {
    try {
      const response = await db.remove(id);
      res.status(204).json(response);
    } catch(ex) {
      res.status(500).json({ error: "The post could not be removed" });
    }
  } else {
    res.status(404).json({ message: "The post with the specified ID does not exist" });
  } 
})

server.put('/api/posts/id', async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if(post){
  try {
    const response = await db.update(id, post)
    res.status(200).json(response);
  } catch(ex) {
    res.status(500).json({ message: "Error updating posts" })
  }
  } else{
    res.status(404).json({ error: "Please provide title and contents for the post" })
  }
})

// add your server code starting here
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server is listening at port: ${PORT}`);
})
