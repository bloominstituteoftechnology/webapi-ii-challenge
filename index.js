// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');
const server= express();

server.use(express.json());

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
server.post('/api/posts', async (req, res)=>{
    console.log('body', req.body);
    try {
        const postData= req.body;
        const postId = await db.insert(postData);
        const post= await db.findById(postId.id)
        res.status(201).json(post);
    } catch (error) {
        let message='error creating the post';
        if(error.errno===19){
            message= 'please provide both the name and the bio';
        }
        res.status(400).json({message, error})
    }
})
server.listen(8000,()=>console.log('API Running on port 8000') )