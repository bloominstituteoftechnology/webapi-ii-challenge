// import your node modules
const express=require('express');
const bodyParser=require('body-parser');

const db = require('./data/db.js');

const server=express();

server.use(bodyParser.json());
// add your server code starting here

server.get('/posts',(req,res)=>
    db.find().then(posts=>res.status(200).json(posts)).catch(err=>res.status(500).json({error: "The posts information could not be retrieved."}))
)
server.get('/posts/:id',(req,res)=>
    db.findById(req.params.id)
    .then(post=>{
        if (post.length===0){
        return res.status(404).json({message: "The post with the specified ID does not exist."})
        } else {
        return res.status(200).json(post)}})
    .catch(err=>res.status(500).json({error: "The post information could not be retrieved." }))
)
server.post('/posts',(req,res)=>{
    const post=req.body.post;
    if (!post.title||!post.contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post." });
    } else {
        db.insert(post)
        .then(post=>{
            return db.findById(post.id).then(post=>res.status(201).json(post)).catch(err=>console.log(err))
        })
        .catch(err=>res.status(500).json({ error: "There was an error while saving the post to the database" }))
    }
}
)
server.delete('/posts/:id',(req,res)=>{
    db.remove(req.params.id)
    .then(count=>{
        if (count>0) {
            res.status(200).json({success:`Deleted ${count} item(s)`})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err=>res.status(500).json({error: "The post could not be removed" }))
})
server.put('/posts/:id',(req,res)=>{
    const post=req.body.post;
    if (!post.title||!post.contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    } else {
        db.update(req.params.id,post).then(
            count=>{
                count===1?
                db.findById(req.params.id).then(post=>res.status(200).json(post)).catch(err=>console.log(err)):
                req.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        ).catch(err=>res.status(500).json({ error: "The post information could not be modified." }))
    }
})
server.listen(9000,()=>console.log('Engines firing server starting new horizons venturing.'))