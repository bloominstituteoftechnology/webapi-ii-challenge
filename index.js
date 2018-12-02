// import nodes modules 
const express = require('express');
const db = require('./data/db');

// server starting code here 
const server = express();
const PORT = 4000;
const parser = express.json();

server.use(parser);

// endpoints 

server.get('/api/posts', (req, res)=>{
  db.find()
  .then(posts =>{
    res.json(posts)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message: "The posts information could not be retrieved."})
  });
})

server.get('/api/posts/:id',(req,res) => {
  const { id } = req.params
  db.findById(id)
  .then(post =>{
    if(post.length){
      res.json(post)
    }
    else{
      res
      .status(404)
      .json({message:"The post with the specified ID does not exist "})
    }
  })
  .catch(err =>{
    res
    .status(500)
    .json({message: "The post information could not be retrieved."})
  })
})

server.post('/api/posts',(req, res)=>{
  const post = req.body
  if(post.title && post.contents){
    db.insert(post)
    .then(postId =>{
      console.log(postId)
      db.findById(postId.id)
        .then(post =>{
        res
        .status(201)
        .json(post)
      })
    })
    .catch(err =>{
      res
      .status(500)
      .json({message:"There was an error while saving the post to the database"})
    })
  }
  else{
    res
    .status(400)
    .json({message: "Please provide title and contents for the post." })
  }
})

server.delete('/api/posts/:id',(req, res) =>{
  const { id } = req.params
  db.remove(id)
    .then(count =>{
      if(count){
        res.json({message:"The post has been successfully deleted"})
      }
      else{
        res
        .status(404)
        .json({message:"The post with the specific ID does not exist."})
      }
    })
    .catch(err =>{
      res
      .status(500)
      .json({error:"The post could not be removed"})
    })
})

server.put('/api/posts/:id',(req, res) =>{
  const { id } = req.params
  const post = req.body 
  if(post.title && post.contents){
    db.update(id, post)
    .then(count=>{
      if(count){
        db.findById(id).then((post) =>{
          res.json(post)
        })
      }
      else{
        res
        .status(404)
        .json({message:"The pist with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res
      .status(500)
      .json({error:"The post information could not be modified."})
    })
  }
  else{
    res
    .status(400)
    .json({errorMessage:"Please provide title and contents for the post"})
  }
  
})

//listening
server.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`)
})
