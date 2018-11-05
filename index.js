// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');
const server= express();

server.get('/api/posts',(req, res)=>{
    db.find()
        .then(posts =>{
            res.status(200).json(posts);
        })
        .catch(err =>{
            res
                .status(500)
                .json({message: 'Failed'})
        })
})
server.get('/', (req, res)=>{
    res.json('works')
})
server.listen(8000,()=>console.log('API Running on port 8000') )