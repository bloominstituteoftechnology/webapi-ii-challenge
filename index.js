// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.get('/', (req, res) => {
    res.json('Hello World!');
})

server.listen(3333, () => console.log('Server is listening on port 3333.'));

// Get post by ID
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });

        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
})

// Get all posts
server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    })
});

/* // Creating a new post
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.params;

    db.insert(post)
})
 */

// Updating a post
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

    db.update(id, {title, contents})
    .then(post => {
        if (post) {
            res.status(200);
        } else if (post.title.length === 0 || post.contents.length === 0){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.json(500).json({ error: "The post information could not be modified." })
    })
})

// Removing a post
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(post => {
        if (post) {    
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        })
        .catch(err => {
        res.status(500).json({message: "The post could not be removed"});
    })
});


