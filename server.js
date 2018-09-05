// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());

server.get('/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error('error', err);

            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
})

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.find(id)
        .then(count => {
            if(count) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }));
});

server.post('/posts', async (req, res) => {
    const post = req.body;
    if(post.title && post.contents) {
        try {
            const response = await db.insert(post);
            res.status(201).json(post);
        } catch(err) {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if(count) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }));
});

server.put('/posts/:id', (req, res) => {
    db.update(req.params.id, req.body)
        .then(posts => {
            res.status(200).json(post);
            if(!post.title || !post.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            }
            if(!count) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
})

server.listen(8000, () => console.log('\n== API on port 8k ==\n'));
