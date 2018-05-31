const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');
const port = 5000;

const server = express();
server.use(express.json());
server.use(cors({origin: 'http://localhost:3000'})); //pass in origin if needing to lock API down for a specific origin or if you dont want requests from certain unwanted urls. Otherwise, can make it open access for any client. 

// server code here

//POST REQUEST
server.post('/api/posts', (req, res) => {
    
    const { title, contents } = req.body
    
    if (!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        return; //need this return other if title or contents are missing, it will display error but when you do get request you will still see the newly created post w/o the title or contents
    }

    db
        .insert({ title, contents })
            .then(response => {
                db.findById(response.id) //returns newly created post
                .then(post => {
                    res.status(201).json({post});
                })
                // res.status(201).json(response) //returns id of newly created post
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
            res.json(posts);
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

            res.json(post[0])
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
                return;
            }

            //return newly updated post
            db  
            .findById(id)
            .then(post => {
                // console.log(post);
    
                if (post.length === 0) { // if requested ID doesn't exist, an empty array is returned, unless error is handled
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
    
                res.json(post[0])
            })
            .catch(error => {
                res.status(500).json({ error: "The post information could not be retrieved." })
            })

        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})



server.listen(port, () => console.log(`Magic Happening on port ${port}`))