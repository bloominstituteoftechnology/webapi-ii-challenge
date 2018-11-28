const express = require('express');

const db = require('./data/db.js');

const server = express();
const PORT = 4000;

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => res.json(posts))
        .catch(err => 
        res.status(500)
        .json({error: "The posts information could not be retrieved."})
        )
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => post.length ? res.json(post) : res.status(404).json({message: "The post with the specified ID does not exist."}))
        .catch(err => 
        res.status(500)
        .json({error: "The post information could not be retrieved."})
        )
})

server.post('/api/posts/', (req, res) => {
    const { title, contents } = req.query;
    if(!title||!contents){res.status(400).json({ errorMessage: "Please provide title and contents for the post." })}
    else {
    const post = {title, contents}
    db.insert(post)
        .then(id => res.status(201).json({...post, ...id}))
        .catch(err => res.status(500).json({error: "There was an error while saving the post to the database"}))}
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;    
    const post = db.findById(id).then(post => post);
    // if(!post.length){res.status(404).json({message: "The post with the specified ID does not exist."})}
    
    db.remove(id)
        .then(records => res.json(post))
        .catch(err => res.status(500).json({error: "The post could not be removed"}))
    }
)

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const {title, contents} = req.query;
    const post = db.findById(id).then(post => post);
    // if(!post.length){res.status(404).json({message: "The post with the specified ID does not exist."})};
    if(!title||!contents){res.status(400).json({errorMessage: "Please provide title and contents for the post."})}
    else{
        const updatedPost = {title, contents};
        db.update(id, updatedPost)
            .then(records => res.json({...updatedPost, id}))
            .catch(err => res.status(500).json({error: "The post information could not be modified."}))
        }
    }
)

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));