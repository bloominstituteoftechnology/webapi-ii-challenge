// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

const bodyParser = require('body-parser');

server.use(bodyParser.json());

server.post('/api/posts', (req, res) => {
    let post = req.body;
    if (!('contents' in post) || !('title' in post)) {
        res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
    }

    db
            .insert(post)
            .then(response => {
        res.status(201).json(post);
        })
        .catch(err => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
        })
 });

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."});
    })
});

server.get('/api/posts/:id', (req, res)=>{
    let id = req.params.id;
    db.findById(id)
    .then(post => {
        if(post.length > 0)
        res.status(200).json(post);
        else
        res.status(404).json({error: 'The post with the specified id does not exist'})
    })
    .catch(err => {
        res.status(500).json({error: "The post could not be retrieved."});
    })
})

server.delete('/api/posts/:id', (req, res) => {
    let id = req.params.id;
    db.remove(id)
    .then(post => {
        if(post > 0)
        res.status(200).json(post);
        else
        res.status(404).json({error: 'The post with the specified id does not exist'})
    })
    .catch(err => {
        res.status(500).json({error: "The post could not be removed."});
    })
    
})

server.put('/api/posts/:id', (req, res)=>{
    let id = req.params.id;
    let post = req.body;
    if (!('contents' in post) || !('title' in post)) {
        res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
    }

    db.update(id, post)
    .then(post => {
        if(post > 0)
        res.status(200).json(post);
        else
        res.status(404).json({error: 'The post with the specified id does not exist'})
    })
    .catch(err => {
        res.status(500).json({error: "The post could not be modified."});
    })
})


server.listen(8000, () => console.log('API running on port 8000'));