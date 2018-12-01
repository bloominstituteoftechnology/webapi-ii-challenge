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
            
            res.json(posts)
        })
        .catch(err =>{
            res.status(500).json({message: 'Could not get posts data'})
        })
})
server.get("/api/posts/:id", (req, res) =>{
   const { id } = req.params;
   
   db.findById(id)
    .then(post =>{
        if(post.length){
            res.json(post)
        }else{
            res.status(500).json({message:'Could not get specified post.'})
        }
    })
    .catch(err =>{
        res.status(500).json({message: `User with ID of ${id} does not exist.`})
    })
  
})

server.post("/api/posts", (req, res) =>{
    const post = req.body;
    if(post.title && post.contents){
        db.insert(post)
            .then(postId =>{
                db.findById(postId.id)
                    .then(post =>{
                        res.status(201).json(post);
                    })
                    .catch(err =>{
                        res.status(500).json({message : "Failed to create new post."})
                    })
            })
    }else{
        res.status(400).json({message: "Missing title or contents."})
    }
})

server.delete('/api/posts/:id', (req, res) =>{
    const {id} = req.params;
    console.log('ID',id)
    db.remove(id)
        .then(count =>{
            if(count){
                res.json({message : 'Successfully deleted'})
            }else{
                res
                    .status(404)
                    .json({message: 'Invalid id'})
            }
        })
        .catch(err =>{
            res 
                .status(500)
                .json({message : 'The post could not be removed'})
        })
})

server.put('/api/posts/:id', (req, res) =>{
    const post = req.body;
    const {id} = req.params;
    if(post.title && post.contents){
        db.update(id, post)
            .then(count =>{
                if(count){
                    db.findById(id)
                        .then(post =>{
                            res.json(post);
                        })
                }else{
                    res.status(404).json({message : 'The post with the specified ID does not exist.'})
                }
            })
            .catch(err =>{
                res.status(500).json({message: 'The post information could not be modified.'})
            })
    }else{
        res.status(400).json({message: "Missing title or contents."})
    }
})

server.listen(PORT, () =>{
    console.log('The server is working!');
})

