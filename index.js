const express = require('express')
// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 4000;

//endpoints
server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "failed to get posts"})
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(post => {
            if (post.length > 0) {
                res.json(post);
                console.log(post)
            }
            else {
                res.status(404)
                    .json({message: "post does not exist"})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "failed to get post"})
        })
});

//listening
server.listen(PORT, () => {
    console.log(`server is now up and running on ${PORT}`)
})