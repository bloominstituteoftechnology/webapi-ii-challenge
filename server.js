// import your node modules
const express = require('express');

// add your server code starting here

const server = express();

const db = require('./data/db.js');

// JSON body parser

server.use(express.json());

// GET for localhost running

server.get('/', (req, res) => {
    res.send('API running');    
})

// GET for entire array

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

// GET for individual post

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
    });
});

// POST new posts to database

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };

    db
    .insert(req.body)
    .then(post => {
        if (newPost) {
            res.status(201);
        }
        res.json(post);
    })
    .catch(err => {
        if (!title || !contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
})

// DELETE a post from the database

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    let posts;

    db
    .findById(id)
    .then(post => {
        posts = { ...post[0] }
    })

    db
    .remove(id)
    .then(response => {
        if (response) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
    });
});

// UPDATE a post from the database

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents;

    db
    .update(id, req.body)
    .then(response => {
        if(response) {
            if (!title || !contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            }
            res.status(200).json(req.body);
        } 
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

server.listen(3000);







