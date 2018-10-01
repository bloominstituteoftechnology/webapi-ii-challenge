// import your node modules
const express = require('express');
const db = require('./data/db.js');




// add your server code starting here

const server = express(); // creates the server

server.get('/', (req, res) => { // request route handler
    res.send('Awaken');
});

server.get('/api/posts', (req, res) =>{
    db.find()
        .then(posts => {
            console.log('\n** users **', posts);
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
            res.json({ error: "Uhh we can't seem to find your posts..."});
        });
});

// watch for traffic in a particular computer port
const port = 9000;
server.listen (port, () => 
console.log(`\n=== API running on port ${port} ===\n`)
);