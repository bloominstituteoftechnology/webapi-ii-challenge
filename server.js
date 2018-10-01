// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();

server.use(cors());

const port = 8000;

server.get('/', (req, res)=> {
    res.send('Hello :)');
});

server.get('/api/posts', (req, res)=> {
    db.find()
        .then(posts=> {
            console.log(posts);
            res.json(posts);
        })
        .catch(err=> {
            res.send(err);
        })
});

server.get('/api/posts/:id', (req, res)=> {
   res.send('id:' + req.params.id);
});

server.listen(port, ()=> {
    console.log(`API running on port ${port}`);
});