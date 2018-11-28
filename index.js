const express = require('express');

const db = require('./data/db.js');

const server = express();

server.get('/api/posts', (req,res)=>{
    db.find()
    .then(posts=>{
        res.json(posts);
    })
    .catch(error=>{
        res.status(500).json({error: 'The posts information could not be retrieved.'});
    });
});

server.get('/api/posts/:id', (req, res)=>{
    const {id} = req.params;
    db.findById(id)
    .then(post=>{
        if(post.length){
            res.json(post);
        }
        else{
            res.status(404).json({message: 'The post with the specified ID does not exist.'});
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'The post information could not be retrieved'});
    });
});

server.listen(5000, ()=>{
    console.log('Staring server on port 5000');
})