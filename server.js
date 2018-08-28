// import your node modules

const db = require('./data/db.js');
const express = require('express'); 

// add your server code starting here

const server = express(); 
server.use(express.json())

server.get('/api/posts', (req,res) => {
    db.find().then(posts => {
        res.status(200).json(posts)
    }).catch( err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

server.get('/api/posts/:id',(req, res) => {
    const id = req.params.id;
    db.findById(id).then(post=> {
        if(post.length > 0){
            res.status(200).json(post)
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
      
    }).catch( err => {
        res.status(500).json({error: "The post information could not be retrieved." })
    })
}); 

server.post('/api/posts', (req, res) => {
    const data = req.body
    if(data.title && data.contents){
        db.insert(data).then(response =>
            db.findById(response.id).then(post => {
                res.status(201).json(post)
            })
        ).catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        })
    }else {
        res.status(400).json( {errorMessage: "Please provide title and contents for the post."})
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id
    
    db.remove(id)
    .then(count => {
        if(count){
            res.status(200).json({message: "Successfully deleted post"})
        }else{
            res.status(404).json({error: "The post with the specified ID does not exist"})
        }
    }).catch(err => {
        res.status(500).json({error: "There was an error removing the post"})
    })
})


server.listen('3000'); 