// import your node modules.
const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const port = 5001;

const server = express();
server.use(express.json());


server.get('/api/posts', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming
    db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error});
         
        })
});



// add your server code starting here
server.listen(port, () => console.log('Server is running on port ${port}'));

