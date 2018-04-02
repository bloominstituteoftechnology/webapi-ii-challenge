// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.get('/', (req, res)=>{
    res.send({ api: 'Running...' })
})

server.get('/posts', (req, res)=> {
    db
        .find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'))