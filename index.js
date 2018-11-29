// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

 server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res
        .status(500).json({message: "This is probably your fault." })
    })
});

 server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
     db.findById(id)
    .then(post => {
        if (!post) {
            res.status(404).json({ message: "TThis is not the post you are looking for." })
        } else {res.status(200).json(post)}
    })
    .catch(err => {
        res
        .status(500).json({ error: "There's a cat in the server." })
    })
})
// add your server code starting here
 server.listen(9000, () => console.log("Hello! Is there anybody in there?")); 