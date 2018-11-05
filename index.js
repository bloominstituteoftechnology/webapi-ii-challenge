// import your node modules
const express = require("express");
const db = require("./data/db.js");

// add your server code starting here

const server = express();

server.get('/api/posts', (req, res) => {
    db.find().then(post => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
});


server.listen(8000, () => console.log("API running on port 8000"));