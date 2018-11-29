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
            res.json(post[0]);
        }
        else{
            res.status(404).json({message: 'The post with the specified ID does not exist.'});
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'The post information could not be retrieved'});
    });
});

server.put('/api/posts/:id', (req, res)=>{
    res.status(200).json({message: 'Updating'});
})

server.post('/api/posts', (req, res)=>{
    res.status(200).json({message: 'Posted'});
    console.log('Posting');
});

server.delete('/api/posts/:id', (req, res)=>{
    res.status(200).json({message: 'Deleted'});
});

server.listen(5000, ()=>{
    console.log('Starting server on port 5000');
})