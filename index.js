// import your node modules

const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

// Ednpoints

server.get('/api/posts', (req, res) => {

    db.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'Failed to get posts' })

        })

});

server.get('/api/posts/:id', (req, res) => {

    const { id } = req.params;

    db.findById(id)
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res.status(404)
                    .json({ message: 'Failed to get post' })
            }
        })
        //What is the purpose of this catch?
        .catch(err => {
            res.status(500)
               .json({ message: 'Failed to get user' })
        })

})

// Listen