
//for the homework yarn add cors in terminal, and with this line
//server.use(cors()); this needed to connect from react
//const cors = require('cors'); ----this between experess and const db above, this is needed to connet from react

// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
const cors = require('cors');

server.use(cors());

// add your server code starting here

server.get('/', (req, res) => {
    res.send('<h1>Am I Testing Stuff?</h1>');
});

// creates a post
server.post('/api/posts', (req, res) => {
    db.find().then(posts => {
        const { title, contents } = req.body;
        const newPost = { title, content, id: postId };
        if(!title || !contents) {
            return res.status(400)}
            res.json({ errorMessage: "Please provide title and contents for the post." });
        if(title || content) {
            return res.status(201)}
            posts.push(newPost);
            postId++;
            res.json({posts});
        if(!newPost) {
            return res.status(500)}
            res.json({  error: "There was an error while saving the post to the database"  });
        })
        .catch(err => res.send(err));
    })
    

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
    const{ title, contents } = req.body;
    const findPostById = post => {
        return post.id == id;
    };
    const foundPost = posts.find(findPostById);
        if(!foundPost) {
        return res.status(404), 
        res.json({ message: "The post with the specified ID does not exist."})
        } else {
        if (title) foundPost.title = title;
        if (contents) foundPost.contents = contents;
            res.json(posts);
        }})
        
//delete post by id
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const foundPost = posts.find(post => post.id == id);

    if (foundPost) {
        const PostRemove = { ...foundPost };
        posts = pots.filter(post => post.id != id);
        res.status(404).json(posts);
    } else {
        res.json({message: "The post with the specified ID does not exist."});
    }
    });

// //updates post by id
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const findPostById = post => {
        return post.id == id;
    };
    const foundPost = posts.find(findPostById);
    if (!foundPost) {
        return( res.status(404), res.json({ message: "The post with the specified ID does not exist." }))
    } if (!title || !contents) {
        return (res.status(400), res.json({ errorMessage: "Please provide title and contents for the post." }))
    } if (error) {
        return (res.status(400), res.json({ error: "The post information could not be modified." }))
    } else {
        return (res.status(200), res.json(postId))
    };
});

const port = 9000;
server.listen(port, () => console.log(`API running tigerbalm on port ${port}`));