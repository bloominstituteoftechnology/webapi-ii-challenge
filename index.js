const express = require('express');
const db = require('./data/db.js');

const server = express();
const parser = express.json();
server.use(parser);

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(post => {
        if (post.length > 0) {
            res.status(200).json(post)
        } else {
            res.status(404)
            .json({ message: "The post with the specified ID does not exist." })
        }
       
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
    db.insert(post)
    .then(idInfo => {
        db.findById(idInfo.id).then(post => {
            res.status(201).json(post)
        });
    }).catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database"})
    })
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
})

server.delete('/api/posts/:id', (req,res) => {  
    const {id} = req.params;
    db.remove(id)
    .then(resolution => {
        res.json({ message: "Successfully Deleted" })
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
    })
});

server.put('/api/posts/:id', (req,res) => {
    const {id} = req.params;
    const post = req.body;
    if (post.title && post.contents) {
    db.update(id)
    .then(post => {
        if (post.length > 0) {
            db.findById(id).then(post => {
                res.status(200).json(post);
            })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } 
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." });
    })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
});


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

