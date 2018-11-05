// import your node modules
const express=require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
//creat server
const server=express();
server.use(cors());
//GET request for /api/posts
server.get('/api/posts', (req, res, next) => {
    db.find()
    .then(posts =>{
        res.status(200)
        .json(posts);
    })
    .catch(err => {
        res.status(500)
        .json({err: "The posts information could not be retrieved."})
    })
})

//GET request for specific post
server.get('/api/posts/:id', (req, res, next) => {
  //first define id based on url param
    const {id} =req.params;

    db.findById(id)
.then(post => {
    if (post && post.length) {
     res.status(200)
     .json(post);   
    } else {
        res.status(404)
        .json({message: "The post with the specified ID does not exist."});
    }
})
.catch(err=>{
    res.status(500)
    .json({message: "The post information could not be retrieved."})
});
});

server.listen(8000, ()=>console.log('Server is listening on port 8000'));