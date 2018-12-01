// import your node modules
const express =require('express');


const db = require('./data/db.js');

// add your server code starting here
const server = express();
const parser = express.json();
const PORT =4000;

server.use(parser);

//POST /api/posts

server.post('/api/posts', (req, res) =>{
    const post = req.body
    db.insert(post)
    .then( idInfo =>{
        db.findById(idInfo.id).then(user =>{
        console.log("post from insert method",user)
        res
        .status(201)
        .json(user);
        })
    })
    .catch(err =>{
        res
        .status(500)
        .json({ error: "There was an error while saving the post to the database" })
    });
});

server.get('/api/posts', (req, res) =>{
    db.find()
    .then((posts) =>{
        res.json(posts);
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) =>{
    const { id } = req.params
    db.findById(id)
    .then(post =>{
        if (post.length !== 0){
            res.json(post);
        } else {
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    })
});


//DELETE /api/posts/:id 

//PUT /api/posts/:id

server.listen(PORT, () =>{
    console.log(`server is up and running on port ${PORT}`);
});