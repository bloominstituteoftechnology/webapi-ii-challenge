// import your node modules
//imports express
const express = require('express')

//Don't know what this does
const cors = require('cors')

const db = require('./data/db.js');

// add your server code starting here
//creat server
const server = express();
server.use(express.json());
server.use(cors());

//request(aka route) handler
server.get('/', (req, res) => {
    res.send('act like you are working');
});

server.get('/api/posts/', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => res.send(err));
})

//watches for traffic on specific port
const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`)
);