// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors') // needed to connect to react



// add your server code starting here

const server = express(); // creates the server

server.use(cors()); // this needed to connect form react

server.get('/', (req, res) => { // request route handler
    res.send('Awaken');
});

// get post from the api 
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