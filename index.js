// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
const PORT = 3000;
const parser = express.json();
server.use(parser);
// add your server code starting here

server.get('/api/posts', (req, res) => {
    //find
    const curTime = Date();
    console.log('Get request received on :', curTime);
    db.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch(() => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
        console.log('Get request on :', curTime, 'failed to complete. ERR-STATUS: 500');
    })
})

server.get('/api/posts/:id', (req, res) => {
    //findById
    console.log('Get request by ID received on :', Date());
    const {id} = req.params;
    db.findById(id)
    .then((post) => {
        if(post.length) {
            res.json(post);
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
})

server.post('/api/posts', (req, res) => {
    const postObj = req.body;
    if (postObj.title && postObj.contents) {
        db.insert(postObj)
        .then((postID) => {
            db.findById(postID.id)
            .then((post) => {
                res.status(201).json(post);
            })
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const putObj = req.body;
    if (putObj.title && putObj.contents) {
        db.findById(id)
        .then(() => {
            db.update(id, putObj)
            .then((count) => {
                console.log(count);
                db.findById(id)
                .then((post) => {
                    if(post.length) {res.status(200).json(post); }
                })
            })
            .catch(() => {
                res.status(500).json({ error: "The post information could not be modified." });
            })
        })
        .catch(() => {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    let deletedPost;
    db.findById(id)
    .then((post) => {
        if(post.length) { 
            deletedPost = post;
            db.remove(id)
            .then(() => {
                res.status(200).json(deletedPost);
            })
            .catch(() => {
                res.status(500).json({ error: "The post could not be removed" });
            })
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
})

server.listen(PORT, () => {
    console.log('Server started at:', Date(), 'Server is listening');
})
