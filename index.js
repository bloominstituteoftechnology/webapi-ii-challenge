// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved.",
            error: err
        }) 
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id).then(post => {
        if (!post.length) {
            console.log('fail', post)
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else {
            res.status(200).json(post);
            console.log('success', post)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Cant get user',
            error: err
        })
    });
});

server.listen(9000, () => console.log('Server started'))