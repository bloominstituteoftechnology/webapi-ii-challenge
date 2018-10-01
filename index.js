// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors());

server.get('/', (req, res) => {
    db.find()
        .then(posts => {
            console.log('server get', posts);
            res.json(posts);
        })
        .catch(err => res.send(err))
})

const port = 8100; 

server.listen(port, () => 
    console.log(`\n=== API running on port ${port} ===`));