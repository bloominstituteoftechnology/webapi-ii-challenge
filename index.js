// import your node modules
const express = require('express');
const server = express();
server.use(express.json());
const PORT = 4000;

const db = require('./data/db.js');

// add your server code starting here

//Return Array of All posted objects
server.get('/api/posts', (req, res) =>{
    db.find()
        .then((posts) =>{
            res.json(posts)
        })
        .catch((err) =>{
            res.json('Unable to retrieve the posts');
        })
});

//Return post object with specified ID
server.get('/api/posts/:id', (req, res) =>{
    const id = req.params.id;

    db.findById(id)
        .then((post) =>{
            if(post.length !== 0){
                res.json(post)
            }else{
                res.json('The requested post does not exist')
            }
        })
        .catch((err) =>{
            res.json('Unable to retrieve the post')
        })
});

server.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});