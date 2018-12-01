// import your node modules
const express = require('express');
const server = express();
server.use(express.json());
const PORT = 4000;

const db = require('./data/db.js');

// add your server code starting here

//Return Array of All posted objects
server.get('/api/posts', (req, res) =>{
    db.find()
        .then((posts) =>{
            res.json(posts)
        })
        .catch((err) =>{
            res.status(500)
            res.json({ error: "The posts information could not be retrieved."})
        })
});

//Return post object with specified ID
server.get('/api/posts/:id', (req, res) =>{
    const id = req.params.id;

    db.findById(id)
        .then((post) =>{
            if(post[0]){  //check if post exists
                res.json(post)
            }else{
                res.status(404)
                res.json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch((err) =>{
            res.status(500)
            res.json({ error: "The post information could not be retrieved." });        
        })
});   

server.post('/api/posts', (req, res) =>{
    //grab post to add 
    const post = req.body;

    if(post.title && post.contents){
        db.insert(post)
            .then(postID =>{
                db.findById(postID.id)
                    .then(post =>{
                        res.status(201)
                        res.json(post)
                    })

            })
            .catch(err => {
                res.status(500)
                res.json({error: "There was an error while saving the post to the database"});
            });
    }else{
        res.status(400);
        res.json({error: "Please provide title and contents for the post."})
    }

});

server.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});