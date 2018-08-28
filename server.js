const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());


server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts =>{
            res.status(200).json(posts);
        }).catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."}); 
        })
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(posts => {   
            if(posts.length === 0){
                res.status(404).json({message: "The post with the specified ID does not exist."});
            }  else {res.status(200).json(posts);
               }
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved." }); 
        })
});

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(posts => {   
            if(posts.length === 0){
                res.status(404).json({message: "The post with the specified ID does not exist."});
            }  else {res.status(200).json(posts);
               }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"}); 
        })
});

server.post('/api/posts/', (req, res) => {
    let posted = req.body;
    db.insert(posted)
        .then(posts =>{
            if(posted.title && posted.contents){
                res.status(201).json(posts);
            } else {res.status(400).json({error: "Please provide title and contents for the post."});
                }
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database"}); 
        })
});


server.put('/api/posts/:id', (req, res) => {
    const post = req.body;
    const id = req.params.id; 
        db.update(id, post)
        .then(posts => {   
            if(post.length === 0){
                res.status(404).json({message: "The post with the specified ID does not exist."});
            } else if (!post.title || !post.contents) 
                {res.status(400).json({error: "Please provide title and contents for the post."});
            } else {res.status(200).json(posts);
                }
        })   
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database"}); 
        })
});

server.listen(9000, () => console.log('listen test'));

// find: calling find returns a promise that resolves to an array of all the posts contained in the database.
// findById: this method expects an id as it's only parameter and returns the post corresponding to the id provided or an empty array if no post with that id is found.
// insert: calling insert passing it a post object will add it to the database and return an object with the id of the inserted post. The object looks like this: { id: 123 }.
// update: accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// remove: the remove method accepts an id as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted.