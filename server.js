// import your node modules
// importing express
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const port   = 5000;
const server = express();
server.use(express.json());

// declared get() to root route
server.get('/', (req, res) => {
    res.send ('Hello from express')
});

// POST REQUEST
server.post('/api/posts', (req, res) => {
    // declaring const for body
    const { title, contents } = req.body;
    if(!title || !contents) {
        res.status(400).json(`{error: "Please provide title and contents for the post"}`).end();
    } else {
        db
        .insert({ title, contents})
        .then(response => {
           res.status(201).json(response)
        })
        .catch(error => {
            res.json(error)
        });
    }
});

// GET REQUEST
server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json({ posts });
    })
    .catch(error => {
        res.status(500).json(error)
    });
});

// GET request by id
server.get('/api/posts/:id', (req, res) =>{
    const id = req.params.id
    db
    .findById(id)
    .then(posts => {
        if(posts.length === 0){
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(200).json( posts );
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved."});
    })
});

// DELETE by id
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id
    db
    .remove(id)
    .then(posts => {
        if(posts.length === 0){
            return res.status(404).json({message: "The post with the specified ID does not exist."})
        }
        res.status(200).json( posts )  
    })

    .catch(error => {
        res.status(500).json({error: "The post could not be removed"})
    })
});

// PUT Request 
server.put('/api/posts/:id', (req, res) => {
    const  id  = req.params.id;
    const posts = {title: req.body.title, contents: req.body.bio};
    db
    .update(id, posts)
    .then( posts => {
        if( !posts ){
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        if( !req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('contents')) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
        res.status(200).json( posts )
    })
    .catch(error => {
        res.status(500).json(`{error: "The post information could not be modified."}`)
    })
})

// calling serving to listen to traffic 
server.listen(port, () => console.log(`Server running on port ${port}`));