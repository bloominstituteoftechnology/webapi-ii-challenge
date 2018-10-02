// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.get('/', (req, res) => {
    // request/route handler
    res.send('test');
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
})

server.post('/api/posts', (req, res) => {
    if (!req.body || !req.body.title || !req.body.contents) {
        res.status(400).json({ error: "Please provide title and contents for the post." })
    }
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
        .then(postId => {
            const { id } = postId;
            db.findById(id).then(post => {
                console.log(post);
                if (!post) {
                    return res
                        .status(422)
                        .send({ error: `Post does not exist by that id ${id}`});
                }
                res.status(201).json(post);
            });
        })
        .catch(err => console.error(err));
});

server.get('/api/posts/:id', (req, res) => {
    const { id } =  req.params;
    db.findById(id)
    .then(post => {
        if (post.length === 0) {
            return res
                .status(404)
                .send({ error: `The post with the specified ID: ${id} does not exist.`})
        }
        res.status(200).json(post);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The posts information could not be retrieved" })
    })
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deletedPost => {
            if (post.length === 0) {
                return res
                .status(404)
                .send({ error: `The post with the specified ID: ${id} does not exist.` })
            }
            console.log(deletedPost);
            res.status(200).json(deletedPost);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "The post could not be removed" })
        })
})

server.put('/api/posts/:id', (req, res) => {
    if (!req.body || !req.body.title || !req.body.contents) {
        res.status(400).json({ error: "Please provide title and contents for the post." })
    }
    const { id } = req.params;
    const { title, contents } = req.body;
    const newPost = { title, contents };
    console.log(newPost);
    db.update(id, newPost)
        .then(post => {
            if (post.length === 0) {
                return res
                .status(404)
                .send({ error: `The post with the specified ID: ${id} does not exist.` })
            }
            console.log(post);
            res.status(200).json(post);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "The post information could not be modified." })
        })
});

const port = 8000;
server.listen(port, () =>
    console.log(`\n=== API running on port ${port} ===\n`)
);