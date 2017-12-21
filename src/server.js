/* eslint-disable */

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;


// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [
  {
    title: 'The post title',
		contents: 'The post contents',
		id: 0,
	},
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// GET Request

server.get("/posts", (req, res) => {
    res.status(200).json(posts);
});


server.get("/posts/:term", function( req, res ) {
    const post = posts.find(post => post.title.includes(req.params.term) || post.contents.includes(req.params.term));
    res.status(200).json(post);
});

server.post('/posts', (req, res) => {
	if (typeof req.body == 'string') {
		let post = (req.body); // Parse Body
		posts.push(post);
		res.status(200).json(post);
	} else {
		res.status(503).json({error: "missing body"});
	}
});

server.put("/posts", (req, res) => {
	if (typeof req.body == 'string') {
		let post = (req.body);
		posts[post.id] = post;
		res.status(200).json(post);
	} else {
		res.status(503).json({error: "missing body"});
	}
});

// Need to figure out delete
// server.delete("/posts:id", (req, res) => {
// 	posts = posts.splice
// })

module.exports = { posts, server };
