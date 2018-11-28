// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
server.use(bodyParser.json());
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

const posts = [];

server.post('/api/posts', (req, res) => {
    const posts = req.body.posts; 
    if (!posts) {
        res.status(304)
        res.json({ error: "Must provide post" });
        return;
    }

    posts.push(posts);
})
 

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})