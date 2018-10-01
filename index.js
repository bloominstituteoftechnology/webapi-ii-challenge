// import your node modules
const express = require('express');


const db = require('./data/db.js');

const server = express();


const cors = require('cors');

server.use(cors());
 server.get('/', (req, res) => { //request/route handler
    res.send('Hello FSW13');
});
 server.get('/api/posts', (req, res) =>{
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => res.send(err))
});

// add your server code starting here

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`)); 