// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 5000;

server.use(express.json());

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count) {
                res.json({message: `Successfully deleted the post with ID: ${req.params.id}`})
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"});
        })
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.status(500).json({error: "The posts information could not be retrieved."});
        });
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if (post && post.length > 0) res.json(post);
            else res.status(404).json({message: "The post with the specified ID does not exist."});
        })
        .catch((err) => {
            res.status(500).json({error: "The post information could not be retrieved."});
        });
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
        db.insert(post)
            .then(idObject => {
                db.findById(idObject.id)
                    .then(post => {
                        res.status(201).json(post);
                    })
            })
            .catch(err => {
                res.status(500).json({error: "There was an error while saving the post to the database"});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
});

server.put('/api/posts/:id', (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
        db.update(req.params.id, post)
            .then(count => {
                if (count) {
                    db.findById(req.params.id)
                        .then(post => {
                            res.json(post);
                        })
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist."});
                }
            })
            .catch(err => {
                res.status(500).json({error: "The post information could not be modified."});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
});

server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
