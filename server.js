const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db');
// anything that is served data is a client
const server = express();

server.listen(5000, () => {
    console.log('===SERVER RUNNING ON PORT 5000===');
})

server.use(helmet());
server.use(cors());
server.use(express.json());

// okay now, just like in the lecture video, let's make our server routes:

server.get('/', (req, res) => {
    res.send('<h2>GET REQUEST RECEIVED</h2>');
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json({ posts })
        })
        .catch(err => {
            res.status(500).json({ error: "The posts informations could not be retrieved." })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    db.findById(postId)
        .then(post => {
            res.json({ post });
        })
        .catch(err => {
            res.status(404).json({ error: "The post with the specified ID does not exist." })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let post;
    db.findById(id)
        .then(foundPost => {
            if (foundPost.length === 0) return res.status(404).json({ message: "The post with the specified ID does not exist." });
            db.remove(id)
                .then(response => {
                    res.status(200).json({ message: "===POST DELETED===" })
                })
        })
        .catch(err => response.status(500).json({ err }))
})

server.post('/api/posts', (req, res) => {
    console.log(req);
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.insert(req.body)
        .then(response => {
            res.status(201).json({ ...req.body, ...response });
        })
        .catch(err => response.status(500).json({ err }));
})

server.put('/api/posts/:id', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.update(req.params.id, req.body)
        .then(response => {
            if (response === 0) return res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist.` });
            // res.status(200).json(req.body);
            db.findById(req.params.id)
              .then(response => {
                  res.json(response);
              })
              .catch(err => res.status(404).json({ err }))
        })
        .catch(err => response.status(500).json({ error: "The post information could not be modified." }));
})