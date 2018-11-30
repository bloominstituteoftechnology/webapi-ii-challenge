// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/posts', function(req, res) {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

app.post('/api/posts', function(req, res) {
    const post = req.body;
    if(post) {
        db.insert(post)
            .then(id => {
                db.findById(id)
                    .then(post => {
                        res.json(post);
                    });
            })
            .catch(() => {
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
});

app.get('/api/post/:id', function(req, res) {
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if (post[0]) {
                res.json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
