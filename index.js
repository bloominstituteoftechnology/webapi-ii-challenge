const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(express.json());

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
    const {id} = req.params;
    const post = req.body;
    if(post.title && post.contents){
        db.update(id, post)
        .then(count=>{
            if(count){
                db.findById(id)
                .then(user=>{
                    res.status(200).json(user);
                })
            }
            else{
                res.status(404).json({message: 'The post with the specified ID does not exist'});
            }
        })
        .catch(error=>{
            res.status(500).json({error: 'The post information could not be modified.'});
        });
    }
    else{
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'})
    }
})

server.post('/api/posts', (req, res)=>{
    const post = req.body;
    if(post.title && post.contents){
        db.insert(post)
        .then(idObj=>{
            db.findById(idObj.id)
            .then(newPost=>{
                res.status(201).json(newPost[0]);
            })
        })
        .catch(error=>{
            res.status(500).json({error: 'There was an error while saving the post to the database.'})
        });
    }
    else{
        res.status(400).json({errorMessage: 'Please provide title and contents for the posts.'});
    }
});

server.delete('/api/posts/:id', (req, res)=>{
    const {id} = req.params;
    db.findById(id)
    .then(postToDelete=>{
        if(postToDelete.length){
            db.remove(id)
            .then(count=>{
                if(count){
                    res.status(200).json(postToDelete[0]);
                }
            })
        }
        else{
            res.status(404).json({message: 'The post with the specified ID does not exist.'});
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'The post could not be removed.'})
    })
});

server.listen(5000, ()=>{
    console.log('Starting server on port 5000');
})