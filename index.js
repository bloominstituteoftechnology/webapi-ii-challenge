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
            res.status(200).json(posts);
        })
        .catch(err => res.status(400).send(err));
});

server.get('/api/posts/:id', (req,res)=>{
    const {id} = req.params;
    db.findById(id)
        .then(post =>{
            console.log('post:{', post, '}');
            res.status(200).json(post);
        })
        .catch(err => res.status(400).send({error:"The posts information could not be retrieved."},err));
});