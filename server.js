// import your node modules
const express = require('express');
const bodyParser = require('body-parser')
const db = require('./data/db.js');

const server = express();
server.use(bodyParser.json());

// add your server code starting here

server.get(`/api/posts`, (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved."});
        });
});

server.post(`/api/posts`, (req, res) => {
    const Body = req.body ? req.body : {}
    const { title, contents } = Body;
    // console.log(req.body);
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        return;
    }
    const newPost = {
        title,
        contents,
    }

    db
        .insert(newPost)
        .then(id => {
            const post = { ...newPost, id }
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved."});
        });
});

const port = 5000;

server.listen(port, () => console.log('API Running on port 5000'))