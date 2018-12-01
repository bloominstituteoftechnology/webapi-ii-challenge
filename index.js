// import your node modules


const express = require('express');
const server = express();
const PORT = 4000;
const db = require('./data/db');
const parser = express.json();
server.use(parser);

server.get('/api/posts', (req, res) =>{
    db.find()
        .then(posts =>{
            //console.log('This be posts', post)
            res.json(posts)
        })
        .catch(err =>{
            res.status(500).json({error: 'Could not get posts data'})
        })
})
server.get("/api/posts/:id", (req, res) =>{
   const { id } = req.params;
   //console.log('I am ID', id)
   db.findById(id)
    .then(post =>{
        if(post.length){
            res.json(post)
        }else{
            res.status(500).json({error:'Could not get specified post'})
        }
    })
    .catch(err =>{
        res.status(500).json({error: `User with ID of ${id} does not exist`})
    })
  
})
server.post('/api/posts', (req, res) =>{
    const newPost = req.body;
    console.log('new post', newPost)
    if(newPost.title && newPost.contents){
        db.insert(newPost)
            .then(post =>{
                res.status(201).json(post)
            })
            .catch(err =>{
                res.status(500).json({error : 'Could not add new post to DB'})
            })
    }
})

server.listen(PORT, () =>{
    console.log('The server is working!');
})
// add your server code starting here
