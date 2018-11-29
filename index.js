// import your node modules

const db = require('./data/db.js');
const express = require('express'); 
const server = express(); 
const PORT = 4000

// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
    .then( (post) => {
        res.json(post);
    })
    .catch( err => {
        res
        .status(500)
        .json({error: "The posts information could not be retrieved."})
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
        .json({error: "The posts information could not be retrieved."})
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


server.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}`)
})