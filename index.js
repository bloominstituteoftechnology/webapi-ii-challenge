// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({message: 'cannot find post', 'error ':error});
        })
});


server.listen(8000, () => console.log("Server running on port 8000"));