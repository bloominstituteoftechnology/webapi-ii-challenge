// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();

server.use(express.json());
// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500)
                .json({error: 'The posts information could not be retrieved.'})
        })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
        .then(post => {
            if(post) {
                res.json(post);
            } else {
                res
                    .status(404)
                    .json({message: 'The post with the specified ID does not exist'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'The post information could not be retrieved'});
        })
})

server.post('/api/posts', (req, res) => {
    const post = req.body;
    console.log('post from body ', post);
    db.insert(post)
        .then((post) => {
            console.log('post from insert method', post);
            res.json(post);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'Failed to insert user in DB'});
        });
});

// server.put('/api/posts/:id', (req, res) => {

// })

// server.delete('/api/posts/:id', (req, res) => {

// })

server.listen(4000);