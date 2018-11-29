// import your node modules

const db = require('./data/db.js');
const express = require('express'); 
const server = express(); 
const PORT = 4000

// add your server code starting here

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents }; 
    db.insert(newPost)
    .then(postId => {
        db.findById(postId)
        .then( post => {
            if(!post){
                res
                .status(400)
                .json({errorMessage: "Please provide title and contents for the post."})
            }
            res
            .status(201)
            .json(post)
        })
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "There was an error while saving the post to the database", err})
    })   
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then( (post) => {
        res.json(post);
    })
    .catch( err => {
        res
        .status(500)
        .json({error: "The posts information could not be retrieved.", err})
    })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; 
    db.findById(id)
    .then((post) => {
        if(post.length > 0) {
            res.json(post)
      } else {
            res
            .status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
     })
    .catch( err => {
        res
        .status(500)
        .json({error: "The posts information could not be retrieved.", err})
     })
 })

 server.delete('/api/posts/:id', (req, res) => {
     const { id } = req.params;
     if(!id){
        res
        .status(404)
        .json({message: "The post with the specified ID does not exist."})
     }
     db.remove(id)
         .then((post) => {
             res.json(post);
     })
     .catch( err => {
         res
         .status(500)
         .json({error: 'The post could not be removed', err})
     })
 })

 server.put('/api/posts/:id', (req, res) => {
     const { id } = req.params;
     const { title, contents } = req.body;
     const newPost = { title, contents }; 
     if(!id){
         res
         .status(404)
         .json({message: "The post with the specified ID does not exist."})
     } else if(!title || !contents){
         res
         status(400)
         .json({errorMessage: "Please provide title and contents for the post."})
     }
     db.update(id, newPost)
     .then(post => {
         res
         .status(200)
         .json(post)
     })
     .catch(err => {
         res
         .status(500)
         .json({error: "The post information could not be modified.", err})
     })
 })

server.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}`)
})