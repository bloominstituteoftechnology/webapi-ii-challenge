// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();
const PORT = 4500;

server.use(express.json());

// add your server code starting here

//GETS
server.get('/api/posts', (request, response) => {
    db.find()
        .then((posts) => {
            response.json(posts);
        })

        .catch(err => {
            response
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
        });
});

server.get('/api/posts/:id', (request, response) => {
    const { id } = request.params;
    db.findById(id)
        .then(post => {
            if (post) {
                response.json(post)
            }
            else {
                response
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." });
            }
        })

        .catch(err => {
            response
                .status(500)
                .json({ error: "The post information could not be retrieved." });
        })
})

//POST
server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
        db.insert(post).then(idInfo => {
            db.findById(idInfo.id)
                .then(post => {
                    res.status(201).json(post);
                });
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "There was an error while saving the post to the database" });
        })
    }

    else {
        res
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." });
    }
});

//DELETE
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: 'Removed Succesfully'})
            }
            else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." });
            }
        })

        .catch(err => {
            res
                .status(500)
                .json({ error: "The post could not be removed" });
        })
});

//PUT
server.put('/api/posts/:id', (req, res) => {

});

// listening
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});