// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();
const PORT = 4500;

// add your server code starting here

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

server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});