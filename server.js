const express = require('express');
const db = require('./data/db');

const server = express();

// add your server code starting here

// get all post
server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts)
    }).catch(error => {
        console.log(error);
    })

});

server.get('/api/posts/:id', (req, res) => {

    const { id } = req.params;
    db.findById(id)
        .then(posts => {
            if (posts.length) {
                res.json(posts[0]);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

server.listen(5000,() => console.log(`API Running on port 5000`));