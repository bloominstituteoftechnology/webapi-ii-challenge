// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express ();
// add your server code starting here
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ message: 'Cannot Get Data' });
        });
});
server.listen(3000, () => console.log('Listening on Port 3000'));