// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

// add your server code starting here
server.post('/api/posts', (req, res) => {
    const post = req.body;

    db.insert(post)
        .then(post => {
            if(!title || !contents){
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            }else{
                posts.push(post);
                res.status(201).json({ posts });
            }
        })
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: 'The posts information could not be retrieved.', 'error': error });
        })
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if(post){
                res.status(200).json(post);
            }else{
                res.status(404).json({ message: 'The post with the specified ID does not exist.'});
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'The post information could not be retrieved.' });
        });
})

server.listen(8000, () => console.log("Server running on port 8000"));