const express = require('express');

const db = require('./data/db');

const server = express();

const PORT = 4000;

server.use(express.json());
// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({error: "The posts information could not be retrieved."})
        })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res
                    .status(404)
                    .json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({error: "The post information could not be retrieved."})
        })
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    console.log(post);
    if(post.title && post.contents){
        db.insert(post)
        .then(idInfo => {
            db.findById(idInfo.id).then(post => {
                res.status(201).json(post)
            })
        })
        .catch(err => {res.status(500).json({errorMessage: "Please provide title and contents for the post."})})
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

server.listen(PORT, () => {
    console.log('server is running')
})