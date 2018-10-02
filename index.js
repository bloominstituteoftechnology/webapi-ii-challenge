//Import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

//Add your server code starting here
const server = express();

//Need for some reason? 
server.use(cors());
server.use(express.json());

//GET
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(() => res.status(500).json({error: "The posts information could not be retrieved."}))
})

//GET by id
server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(404).json({message: "The post with the specified ID does not exist"});
    }
    db.findById(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(() => res.status(500).json({error: "The post information could not be retrieved."}));
})

//POST
server.post('/api/posts', (req, res) => {
    const {title, contents} = req.body;
    if(!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
    const newPost = {title, contents};
    db.insert(newPost)
        .then(postId => {
            const{id} = postId;
            db.findById(id)
                .then(post => {
                    if(!post) {
                        return res.status(422).send({Error: `Post does not exist by id: ${id}`})
                    }
                    res.status(201).json(post);
                })
        })
        .catch(() => res.status(500).json({error: "There was an error while saving the post to the database"}))
})

//DELETE
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(404).json({message: "The post with the specified ID does not exist"});
    }
    db.remove(id)
        .then(removedPost => {
            res.status(200).json(removedPost);
        })
        .catch(() => res.status(500).json({error: "The post could not be removed."}))
})

//PUT
server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(404).json({message: "The post with the specified ID does not exist"});
    }
    const {title, contents} = req.body;
    if(!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
    const updatedPost = {title, contents};
    db.update(id, updatedPost)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(() => res.status(500).json({error: "The post information could not be modified."}));
})


const port = 8100; 
server.listen(port, () => 
    console.log(`\n=== API running on port ${port} ===`));