// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 4000


server.get('/api/posts', (req, res) => {
    db.find()
      .then(post => {
        res
            .json(post);
    })
      .catch(err => {
        res
            .status(500)
            .json({ message: "Unable to retrieve posts"});
    })
});


server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(postId => {
        if (postId) {
          res.json(postId);
        } else {
            res
                .status(404)
                .json({ message: "Post id invalid"});
        }
    })
        .catch(err => {
        res
            .status(500)
            .json({ message: "Unable to get post Id"})
    })
});


server.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`)
})