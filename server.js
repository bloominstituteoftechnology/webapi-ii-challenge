// import your node modules
const express = require('express');

// add your server code starting here

const server = express();

const db = require('./data/db.js');

server.get('/', (req, res) => {
    res.send('API running');
})

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db
    .findById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "Not found" })
        } else {
            res.json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post with the specified ID does not exist." })
    })
});



server.post('api/posts', function(req, res) {
    const  { body } = req.body;
    console.log(req.body)
    const post = {body};
    // if (!title || !content) {
    //     res.status(400).json({ errorMessage: "Enter Title and Content"})
    // }

    db
    .insert({body})
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: error})
    })
})



server.listen(3000);
