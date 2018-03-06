const bodyParser = require('body-parser');
const express = require('express');
/* eslint-disable */

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    title: 'test',
		content: 'content',
		id: 1
  },
  {
    title: 'test search',
		content: 'content search',
		id: 2,
  }
];

let idCounter = 2;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts/', (req, res) => {
  res.status(200);
  res.send(posts);
});

server.get('/posts/search', (req, res) => {
  const title = req.query.title.toLowerCase();
	let filteredPosts = [];

  if (title) {
		filteredPosts = posts.filter((post) => {
			let postTitle = post.title.toLowerCase();
			postTitle = postTitle.split(' ');
      return postTitle.includes(title);
    });
	}
	
	if (filteredPosts.length === 0) {
		res.status(200);
		res.send(posts);
	} else {
		res.status(200);
		res.send(filteredPosts);
	}
});

server.post('/posts/', (req, res) => {
	if (!req.body.title && !req.body.content) {
		res.status(400);
		res.send({ error: "You did not provide both title and contents" });
	}
	let { title, content } = req.body
	idCounter = idCounter++
	let newPost = {
		title: title,
		content: content,
		id: idCounter,
	}
	posts.push(newPost);
	res.status(200);
	res.send(newPost);
})

module.exports = { posts, server };
