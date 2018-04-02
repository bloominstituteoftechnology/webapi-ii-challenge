const express = require('express');

const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


const db = require('./data/db.js');

const port = 5000;
server.listen(port, () => console.log("Server up and running"));



server.get('/', (req, res) => {
    res.json('Server up and running....')
})

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            req.abort(posts);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
}) 

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;

    db
        .findById(id)
        .then(posts => {
            res.json(posts[0]);
        })
        .catch(error => {
            if (res.status(404)) {
                req.abort(posts[0]);
                res.json({ error: "The post with the specified ID does not exist." })
            } else if (res.status(500)) {
                res.json({ message: "The post information could not be retrieved."})
            }
        })
})

server.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const incrementId = 1;
    const newPost = {};

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        incrementId++;
        newPost = {
            incrementId, 
            title,
            contents
        }

        db
            .insert(newPost)
            .then(posts => {
                res.status(200).json(newPost);
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the user to the database."})
            })
        }
})

server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const newPost = {};

    if(id === null) {
        res.status(404).json({ message: "The post wit the specified "})
    } else if (!title || !content) {
        req.abort();
        res.status(400).json({ errorMessage: "Please provide title and contents for the posts." });
    } else {
        db
            .update(id, newPost)
            .then(posts => {
                res.status(200).json(newPost);
            })
            .catch(error => {
                req.abort();
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }

})
 
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;

    if(id !== id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
        db
            .remove(id)
            .then(posts => {
                res.json(posts)
            })
            .catch(error => {
                res.status(500).json({ message: "The post could not be removed." })
            })
    }   
})


