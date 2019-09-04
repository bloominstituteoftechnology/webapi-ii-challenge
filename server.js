const express = require('express'); //import express;
const server = express();

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

server.get('/api/posts', (req, res) => {
    res.status(200).json(posts);
});

server.get('/api/comments', (req, res) => {
    res.status(200).json(comments);
});

//Export
module.exports = server;
