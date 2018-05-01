const express = require('express');
const db = require('./data/db');

let bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json());

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



server.post('/api/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        return;
    }

    db.insert(req.body)
        .then(post => {
            console.log(post);
            res.status(201).json(req.body);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        });
});

server.delete('/api/posts/:id', (req, res) => {
    let id = req.params.id
    db.remove(id)
        .then(response => {
            if (response == 0) {
                res.status(404).send({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).send({ message: `User with id ${id} deleted` })
            }
        })
        .catch(error => res.status(500).send({ error: "The post could not be removed" }))
});

server.put('/api/posts/:id', (req, res) => {
    let id = req.params.id;
    let post = req.body;
    if (post && (post.title || post.contents)) {
        db.update(id, post)
            .then(response => {
                if (response == 0) {
                    res.status(404).send({ message: "The post with the specified ID does not exist" })
                } else {
                    db.findById(id)
                        .then(response => {
                            res.status(200).send(response)
                        })
                        .catch(error => res.status(500).send( { error: "There was an error updating the post" }))
                }
            })
    } else {
        res.status(400).send({ error: "Please provide title or content for the post" })
    }
});

server.listen(5000,() => console.log(`API Running on port 5000`));
