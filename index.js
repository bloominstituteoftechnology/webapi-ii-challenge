// import your node modules
const express = require('express');
const db = require('./data/db.js');
const PORT = 9000;

// add your server code starting here
const server = express();

server.get('api/posts/', (req, res) => {
    db.find()
    .then(posts => {
        console.log(posts);
        const formattedPosts = posts.map(post => ({
            title: post.title,
            contents: post.contents
        }));
        console.log(formattedPosts);
        res.status(200).json(formattedPosts);
    })
    .catch(error => {
        res.status(500).json({error: "Could not retrieve post information"});
    })
});

server.listen(PORT, () => console.log('Server is running on port: ' + PORT));