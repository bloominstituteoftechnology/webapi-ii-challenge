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
    if (post.title && post.contents){
        db.insert(post)
        .then( idInfo =>{
            db.findById(idInfo.id).then(user =>{
                res
                .status(201)
                .json(user);
            });
        })
        .catch(err =>{
            res
            .status(500)
            .json({ error: "There was an error while saving the post to the database" })
        });
    } else {
        res
        .status(400)
        .json({errorMessage: "Please provide title and contents for the post." })
    }
});

server.get('/api/posts', (req, res) =>{
    db.find()
    .then((posts) =>{
        res
        .status(200)
        .json(posts);
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
            res
            .status(200)
            .json(post);
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
server.delete('/api/posts/:id', (req, res) =>{
    const { id } = req.params
    db.remove(id)
    .then(count =>{
        if(count===1){
            res
            .status(200)
            .json(post)
        } else{
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The post could not be removed" })
    })
})

//PUT /api/posts/:id

server.put('/api/posts/:id', (req, res) =>{
    const { id } = req.params
    const post  = req.body
    db.update(id, post)
    .then(count =>{
        if(count===1){
            if(post.title && post.contents){
            res
            .status(200)
            .json(post)
            } else {
                res
                .status(400)
                .json({errorMessage: "Please provide title and contents for the post." })
            }
        } else {
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The post information could not be modified." })
    })
})

server.listen(PORT, () =>{
    console.log(`server is up and running on port ${PORT}`);
});