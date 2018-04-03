// import your node modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');


const db = require('./data/db.js');
const server = express();
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

// add your server code starting here
server.get('/api/posts', (req,res) =>{
    db.find()
    .then(posts =>{
        res.json(posts);
    })
    .catch(error =>{
        res.status(500).json({error: 'the posts informationcould not be retrieved.'})
    })
})

server.post('/api/posts', (req,res) =>{
    const post =req.body;
   if(!post.title||!post.contents){
       
       res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
   }
    db.insert(post)
    .then(response =>{
        res.status(201).json(post);

    })
    .catch(error =>{
        res.status(500).json({error:'error'})
    })
    
})
server.delete('/api/posts/:id',(req,res) =>{
    const { id } = req.params;
    let post;
    db.findById(id)
    .then(response =>{
        post = {...response[0] };

   
    db.remove(id)
    .then(response =>{
        res.status(200).json(post);
    })
    .catch(error=>{
        res.status(500).json(error);
    })
})
.catch(error=>{
    res.status(500).json(error);
});
});


server.put('/api/posts/:id',(req,res) =>{
    const { id } = req.params;
    const update = req.body;
    
    db.update(id,update)
    .then(count =>{
        if(count > 0) {
            db.findById(id)
            .then(updatedPosts =>{
                res.status(200).json(updatedPost);
            });
        }
        else{
            res.status(404)
            .json({message:'the post'});
        
        };
   
   
}).catch(error);
});
const port =5000;
server.listen(port, () =>console.log('server listening at port 5000'));