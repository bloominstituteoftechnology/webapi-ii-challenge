
//for the homework yarn add cors in terminal, and with this line
//server.use(cors()); this needed to connect from react
//const cors = require('cors'); ----this between experess and const db above, this is needed to connet from react

// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());
const cors = require('cors');

server.use(cors());

// add your server code starting here

server.get('/', (req, res) => {
    res.send('<h1>Am I Testing Stuff?</h1>');
});

// creates a post
server.post('/api/posts', (req, res) => {
        const { title, contents } = req.body;
        const newPost = { title, contents };
        db.insert(newPost)
        .then(postId => {
            const { id } = postId;
            db.findById(id).then(post => {
                console.log(post);
                    res.status(201).send(post);
            });
        })
        .catch(error => {
            if(!title || !contents) {
                return res.status(400).send({ errorMessage: "Please provide title and contents for the post." });
            } else if (!post) {
                return res.status(422).send({ Error: `There is no post with id ${postId}`});
            } else {
                 res.status(500).send({  error: "There was an error while saving the post to the database"  });
            }
        })
    });
    

// getting an array of all post objs 
    server.get('/api/posts', (req, res) => {
        db.find().then(posts => {
            console.log(posts);
            res.json(posts);
        if(!posts) {
            return res.status(500)} 
            res.json({ error: "The posts information could not be retrieved." });
        })
        .catch(err => res.send(err));
    });

//getting post by id
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(post => {
        if(post.length === 0) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." });
        }
        res.status(200).json(post);
    })
    .catch(error => res.status(500).send({error: "The posts information could not be retrieved." }));
});
        
//delete post by id
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
   db.remove(id).then(deletedPost => {
       if(!deletedPost) {
           return res.status(404).send({ Error: "The post with the specified ID does not exist." });
       } else {
           res.status(200).json({ message: "You successfully deleted the post." });
       }
   })
   .catch(error => res.status(500).send({ error: "The post failed to delete." }));
});

// //updates post by id
// server.put('/api/posts/:id', (req, res) => {
//     const { id } = req.params;
//     const { title, contents } = req.body;
//     const findPostById = post => {
//         return post.id == id;
//     };
//     const foundPost = posts.find(findPostById);
//     if (!foundPost) {
//         return( res.status(404), res.json({ message: "The post with the specified ID does not exist." }))
//     } if (!title || !contents) {
//         return (res.status(400), res.json({ errorMessage: "Please provide title and contents for the post." }))
//     } if (error) {
//         return (res.status(400), res.json({ error: "The post information could not be modified." }))
//     } else {
//         return (res.status(200), res.json(postId))
//     };
// });

const port = 9000;
server.listen(port, () => console.log(`API running tigerbalm on port ${port}`));