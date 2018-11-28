// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// add your server code starting here

const PORT = 4001;

server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.json(posts)
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get posts" })
        });
})

server.get('/api/posts/:id', (req, res) => {

    const { id } = req.params;
    db.findById(id)
        .then(posts => {
            if (posts) {
                res.json(posts);
            } else {
                res
                .status("Posts not found")
        }
        })
        .catch(err => {
            res
            .status(500)
            .json({ message: "failed to get posts"})
        })
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})