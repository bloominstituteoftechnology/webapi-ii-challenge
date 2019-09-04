const express = require('express'); //import express;
const dataB = require('./data/db.js');
const server = express();

server.use(express.json()); //middleware -- express to parse JSON body
let postId = 5;
// let commId = 5;

//collection of blog post tht i intend to modify
let comments = [
    {
        text: 'The text of the comment',
        post_id: 1, // Integer, required, must match the id of a post entry in the database
    },
    {
        text: 'This is a second comment to the second post',
        post_id: 2, // Integer, required, must match the id of a post entry in the database
    },
    {
        text: 'This is a third comment to the third post',
        post_id: 3, // Integer, required, must match the id of a post entry in the database
    },
    {
        text: 'This is a fourth comment to the fourth post',
        post_id: 4, // Integer, required, must match the id of a post entry in the database
    },
];

let posts = [
    {
        id: 1,
        title: 'Keeping up with the Joneses',
        contents: "Trying to match everyone's glamorous lifestyle with debt",
        comments: [1, 2],
    },
    {
        id: 2,
        title: 'How I earned my first million',
        contents: 'Money management skills to upgrade to a social class',
        comments: [3, 4],
    },
    {
        id: 3,
        title: 'Things I would have told my 20 year old self',
        contents:
            'From depression, to social interaction, to travels, and self improvement',
        comments: [1, 3],
    },
    {
        id: 4,
        title: 'How web development saved my life',
        contents: 'Finding my passion through programming',
        comments: [2, 3],
    },
];

//sanity check endpoint
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up....' });
});

// //-*-*-*-* GET REQUEST  -*-*-*-*
server.get('/api/posts', (req, res) => {
    res.status(200).json(posts);
});

// server.get('/api/comments', (req, res) => {
//     res.status(200).json(comments);
// });

// -*-*-*-* POST REQUEST  -*-*-*-*
server.post('/api/posts', (req, res) => {
    const bpost = req.body;

    //add the new id
    bpost.id = postId++;
    posts.push(bpost);

    res.status(200).json(posts);
});

// server.post('/api/posts', (req, res) => {
//     res.status(200).json(posts);
// });

// server.post('/api/posts/:id/comments', (req, res) => {
//     res.status(200).json(posts);
// });

//-*-*-*-* GET REQUEST  -*-*-*-*
// server.get('/api/posts', (req, res) => {
//     res.status(200).json(posts);
// });

// server.get('/api/posts/:id', (req, res) => {
//     res.status(200).json(posts);
// });

// server.get('/api/posts/:id/comments', (req, res) => {
//     res.status(200).json(posts);
// });

//-*-*-*-* DELETE REQUEST  -*-*-*-*
// server.delete('/api/posts/:id', (req, res) => {
//     res.status(200).json(posts);
// });

//-*-*-*-* UPDATE REQUEST  -*-*-*-*
// server.put('/api/posts/:id', (req, res) => {
//     res.status(200).json(posts);
// });

//Export
module.exports = server;
