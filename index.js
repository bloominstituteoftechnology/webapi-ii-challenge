// import your node modules
const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json())
const PORT = 4040;

server.get('/api/posts',(req, res)=>{
    db.find()
        .then(posts =>{
            res.json(posts)
        })
        .catch(err =>{
            res.status(500)
                .json({ error: "The posts information could not be retrieved" })
        })
})

server.get('/api/posts/:id', (req, res)=>{
    const { id } = req.params
    db.findById(id)
        .then((posts =>{
            if(posts[0]){ res.json(posts)
            }else{res.status(404)
            .json({ message: "The post with the specified ID does not exist." })}
        }))
        .catch(err=>{
            res.status(500)
            .json({ error: "The posts information could not be retrieved" })
        })
})

server.post('/api/posts', (req, res)=>{
    const { title, contents } = req.body
    db.insert({ title, contents })
        .then((id =>{
           (!title||!contents)?res.status(400)
           .json({ errorMessage: "Please provide title and contents for the post." })
           :res.json({id, title, contents})
        }))
        .catch(err=>{
            res.status(500)
                .json( { error: "There was an error while saving the post to the database" })
        })
})

server.delete('/api/posts/:id', (req, res)=>{
    const { id } = req.params;
    const post = db.findById(id).then(post=>post)
    
    db.remove(id)
        .then(records=>{
            console.log(records)
            records?res.json(post):res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err=>{
            res.status(500)
                .json({ error: "The post could not be removed" })
        })
})

server.put('/api/posts/:id', (req, res)=>{
    const { id } = req.params;
    const post = req.body;
    console.log(post.title, post.contents);
    if(post.title && post.contents){
    db.update(id, post)
        .then(count=>{
            count?db.findById(id)
            .then(post =>{
                res.status(201).json(post)
            })
            :res.status(404)
                .json({message: "The post with the specified ID does not exist."})
            .catch(err=>{
                res.status(400)
                    .json({errorMessage:"Please provide title and contents"})
            })
        })
    }else{res.status(500).json({ error: "The post information could not be modified." })}
})

server.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
})