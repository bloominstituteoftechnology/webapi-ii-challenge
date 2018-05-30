const express = require('express');
const db = require('./data/db.js');
const port = 5000;

const server = express();
server.use(express.json());

// server code here

//POST REQUEST
server.post('/api/posts', (req, res) => {

    const { title, contents } = req.body
    
    if (!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }

    db.insert({ title, contents })
        .then(response => {
            res.status(201)
        })

        db.findById(id)
        .then(post => {
            if (post.length === 0) { 
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.json(post[0])
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    })
});

// GET REQUEST
server.get('/api/posts', (req, res) => {

    db
        .find()
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});

// GET REQUEST BY ID
server.get('/api/posts/:id', (req, res) => {

    const { id } = req.params;

    db  
        .findById(id)
        .then(post => {
            // console.log(post);

            if (post.length === 0) { // if requested ID doesn't exist, an empty array is returned, unless error is handled
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }

            res.status(201).json(post[0])
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

// DELETE REQUEST
server.delete('/api/posts/:id', (req, res) => {

    const { id } = req.params;

    db  
        .remove(id)
        .then(response => {
            // console.log(response) //if you delete by an id that doesnt exist, db returns 0
            if(response === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed." });
        })
})

// PUT REQUEST
server.put('/api/posts/:id', (req, res) => {

    const { id } = req.params;
    const { title, contents } = req.body;

    db
        .update(id, {title, contents})
        .then(response => {
            // console.log(response)
            if (response === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }

            if (!title || !contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            }

            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})



server.listen(port, () => console.log(`Magic Happening on port ${port}`))