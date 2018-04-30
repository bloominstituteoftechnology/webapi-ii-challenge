// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/', (req,res)=>{
res.send('API IS APIE')
})

server.get('/api/posts', (req, res)=>{
    db
    .find()
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(500).json({error: "geting fail"});
    });
});
server.get('/posts/:Id', (req, res)=>{
const {id} = req.params;
    db
    .fndById(id)
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(400).json({error: "getting by id fail"});
    });
});
server.post('/posts', (req, res)=>{
  const post = req.body;
    db
    .insert(post)
    .then(post =>{
       res.status(201).res.json(post);

    })

    .catch(err=>{
        res.status(400).json({error: "Please provide name and bio for the user."});
    });
});
server.put('/posts/:id', (req, res)=>{
    const id = req.params.id
    const newPost = req.body;
    db
    .update(id, newPost)
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(400).json({error: "There was an error while saving the user to the database"});
    });
});
server.delete('/posts/:id', (req, res)=>{
    const {id} = req.params.id
    db
    .remove(id)
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(500).json({error: "failed to delete"});
    });
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));

