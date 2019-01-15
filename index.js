// import your node modules

const express = require('express')

const cors = require('cors')

const server = express()

const PORT = 3999

const db = require('./data/db.js')

server.use(express.json())

// add your server code starting here
server.post('/api/posts', (req, res) => {
 const post = req.body
 console.log(post)
 db
  .insert(post)
  .then((post) => {
   if (post){
    res
     .json(post)
   }
   else {
    res
     .status(400)
     .json({errorMessage: "Please provide title and contents for the post."})
   }
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error while saving the post to the database."})
  })
})


server.get('/api/posts/', (req, res) => {
 db.find()
  .then((posts) => {
   res 
    .json(posts)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "The posts information could not be retrieved"})
  })
})

server.get('/api/posts/:id', (req, res) => {
 const { id } = req.params
 db
  .findById(id)
  .then((post) => {
   if (!id){
    res
     .status(404)
     .json({message: "The post with the specified ID does not exist."})
   }
   else {
    res
     .json(post)
   }
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "The post information could not be retrieved."})
  })
})


server.delete('/api/posts/:id', (req, res) => {
 const { id } = req.params
 db
  .remove(id)
  .then(() => {
   if (id){
    res
     .send({message: "Post was removed from database."})
   }
   else {
    res
     .status(404)
     .json({message: "The post with the specified ID does not exist."})
   }
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "The post could not be removed."})
  })
})
 
server.put('/api/posts/:id', (req, res) => {
 const post = req.body
 const { id } = req.params
 if (post.title && post.contents){
  db
   .update(id, post)
   .then(count => {
    if (count){
     db.findById(id)
       .then(post => {
        res
         .json(post)
       })
    }
    else {
     res
      .status(404)
      .json({message: "The post with the specified ID does not exist."})
    }
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "The post information could not be modified."})
   })
 }
})


server.listen(PORT, () => {
 console.log(`Server is running live on ${PORT}`)
} )