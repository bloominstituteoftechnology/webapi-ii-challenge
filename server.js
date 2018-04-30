// import your node modules
const express = require('express');

// add your server code starting here

const server = express();

const db = require('./data/db.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('API Running');
});

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved" });
    })

})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db
    .findById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "Not Found" })
        } else {
        res.json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post with the specified ID does not exist." });
    })
})

server.post('/api/posts', (req, res) => {
    const post = req.body;
    console.log(req.body);
    //console.log(req);
    db
    .insert(post)
    .then(post => {
        res.json(post);
        }
    )
    .catch(err => {
        //if (!('title' in req.body) || !('contents' in req.body)) {
            res.status(400).json({ message: "Please provide title and contents for the post." })
            console.log(err);
         //}
    })
})



server.listen(3000);
