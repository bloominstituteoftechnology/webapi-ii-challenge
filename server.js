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
        res.status(500).json({error: err});
    });
});
server.get('/api/posts/:Id', (req, res)=>{
    const id = req.params.id
    db
    .fndById(id)
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(400).json({error: err});
    });
});
server.post('/api/posts', (req, res)=>{
    const title = ""
    const contents =""
    const post= {title,content}
    db
    .insert(post)
    .then(post =>{
        res.json(post);

    })

    .catch(err=>{
        res.status(400).json({error: "Post hella failed bruh"});
    });
});
server.put('/api/posts/:id', (req, res)=>{
    const id = req.params.id
    db
    .update(id, posts)
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(400).json({error: err});
    });
});
server.delete('/api/posts', (req, res)=>{
    const id = req.params.id
    db
    .remove(id)
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(500).json({error: err});
    });
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));

