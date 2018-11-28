// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const app = express();
const port = 3000;

app.get('/api/posts', function(req, res) {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
