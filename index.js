// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500)
                .json({error: "The posts information could not be retrieved." },
                console.log(err))
        })
})

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
        .then(posts => {
            if (posts[0] === undefined) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
            else {
                res.status(200).json(posts)
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
})

server.post('/api/posts', async (req, res) => {
    console.log('body', req.body);
    try {
        const postData = req.body;
        const postId = await db.insert(postData);
        const post = await db.findById(postId.id);
        res.status(201).json(post);
    } catch(error) {
        let message = 'There was an error while saving the post to the database'
        res.status(500).json(message);
    }
})

server.listen(9000, () => console.log('server is runner'));