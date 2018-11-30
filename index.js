// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const app = express();
const port = 3000;

server.use(express.json());

app.get('/api/posts', function(req, res) {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
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
