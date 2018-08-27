// import your node modules
const express = require('express');
const db = require('./data/db.js')
const server = express();

// add your server code starting here

server.use(express.json());

//Configure Routing
server.get('/', (req, res) => {
    res.send('Server Initiated');
});

//Configuring Routing with specific endpoint
server.get('/posts', (req,res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error',err);
        res.status(500).json({message: 'Error getting data'})
    });
});

server.listen(9000, () => console.log('\n==API on port 9k==\n'));