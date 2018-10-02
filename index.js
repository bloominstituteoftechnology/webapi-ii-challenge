// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
cors = require('cors');
server.use(cors());

// add your server code starting here
const port = 8000;
server.listen(port, ()=>{
    console.log(`API running on port ${port}`);
})

server.get('/', (req, res)=>{
    res.send('Nothing here for you on the root.');
});

server.get('/api/posts', (req, res)=>{
    db.find()
        .then(posts =>{
            console.log('posts:{', posts, '}');
            res.json(posts);
        })
        .catch(err => response.send(err));
});

server.get('api/posts/:id', (req,res)=>{
    db.findById(req)
        .then(post =>{
            console.log('post:{', post, '}');
            res.json(post);
        })
        .catch(err => response.send({error:"The posts information could not be retrieved."},err));
});