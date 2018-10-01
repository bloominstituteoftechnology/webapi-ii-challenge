// import your node modules
const express = require('express');
const cors = require('cors')
const db = require('./data/db.js');

// add your server code starting here

const server = express();
server.use(cors());

server.get('/', (req, res)=>{
    res.send('what up testing this out!!')
});

server.get ('/api/posts', (req, res)=>{
    db.find().then(users =>{
        res.json(users);
    }).catch(err => res.send(err))
});

const port = 8000
server.listen(port, ()=>
console.log(`\n*** API is running on port ${port} ***\n`)
);