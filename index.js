// import your node modules
const express=require('express');
//our middleware that allows for cross-origin resource sharing (CORS)
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
//create server
const server=express();

//pass all of our requests through CORS
server.use(cors());
//and express' built-in middleware used to parse request 'body' and turn it into usable JSON
server.use(express.json());

//CRUD methods/verbs
//GET request for /api/posts. 'next' is necessary param since we're using middleware
server.get('/api/posts', (req, res, next) => {
    db.find()
    .then(posts =>{
        res.status(200)
        .json(posts);
    })
    .catch(err => {
        res.status(500)
        .json({err: "The posts information could not be retrieved."})
    })
})

//GET request for specific post
server.get('/api/posts/:id', (req, res, next) => {
  //first define id based on url param
    const {id} =req.params;

    db.findById(id)
.then(post => {
    //added post.length condition since post will still return but as an empty array--which is NOT falsey
    if (post && post.length) {
     res.status(200)
     .json(post);   
    } else {
        res.status(404)
        .json({message: "The post with the specified ID does not exist."});
    }
})
.catch(err=>{
    res.status(500)
    .json({message: "The post information could not be retrieved."})
});
});

//POST
server.post('/api/posts', async (req, res) =>{

    //deconstructing instead of req.body.{prop}
    const {title, contents} = req.body;

    //sends a failed 400 response if title or contents are missing
    if (!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    } else {
    try {
        const userData = req.body;
        const userId = await db.insert(userData);
        res.status(201).json(userId);
        } catch (error) {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        }
    }
})

//DELETE
server.delete('/api/posts/:id', (req, res) =>{
    const {id} = req.params;
let body;   
    //first find the content and store it inside variable 'body' so it can be returned by the delete function after being removed
    db.findById(id)
    .then(post => {
    if (post && post.length) {
     body=post;

     db.remove(id)
     .then(count=>{
         res.status(200).json(body);
     })
     .catch(error=>{
         res.status(500).json({error: "The post could not be removed"})
     })

    } else {
        res.status(404)
        .json({message: "The post with the specified ID does not exist."});
    }
    });
})

//UPDATE
server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    
if (!changes.title || !changes.contents) {
    res.status(400).json({errorMessage: "Please provide title and contents for the post."})
} else {
    db.update(id, changes)
    .then(count=>{
    //find post's updated body if successful and returns that     
        if (count) {
            db.findById(id)
            .then(post=> {
            res.status(200).json(post);
            });
        //404 returned if count doesn't exist (meaning no post exists with the id )
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error=>{
        res.status(500).json({error: "The post information could not be modified."})
    })
}
})


server.listen(8000, ()=>console.log('Server is listening on port 8000'));