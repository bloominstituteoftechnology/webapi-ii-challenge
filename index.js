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
server.get('api/posts/:id', (req, res)=>{
    const {id}= req.params;
    db.findById(id)
        .then(post=>{
            if(post){
                res.status(200).json(post);
            }else {
                res.status(404).json({message: 'post not found'})
            }
        })
        .cath(error=>{
            res
                .status(500)
                .json({message: 'cant fetch post'})
        })
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
            message= 'please provide both the title and the content';
        }
        res.status(400).json({message, error})
    }
})
server.delete('/api/posts/:id', (req, res)=>{
    db.findById(req.params.id)
    .then(post=>{
        if(post){
            db.remove(req.params.id)
        .then(count=>{
            res.status(200).json(count);
        })
        .catch(error =>{
            res.status(500).json({message:'error deleting user'})
        })
        }
        else{
            res.status(404).json({message: 'post not found'}) 
        }
    })
    .catch(error=>{
        res
                .status(500)
                .json({message: 'cant fetch post'})
    })
    
})
server.put('/api/posts', (req, res)=>{
    res.status(200).json({url:'/api/posts', operation:'PUT'})
});
server.put('/api/posts/:id', (req, res)=>{
    res.status(200).json({url:'/api/posts', operation:'PUT'});

});
server.put('/api/posts/:id',(req, res)=>{
    const post= posts.findById(p=>p.id==req.params.id);
    if(!post){
        res.status(404).json({message:'Post doesnt exist'});
    }else{
        Object.assign(post, req.body);
        res.status(200).json(post);
    }
})
server.listen(8000,()=>console.log('API Running on port 8000') )