const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
     title: "test",
     content: "content",
	}, 
  
  {
     title: "test search",
		 content: "content search",					
  },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get("/posts/", (req, res) => {
   res.status(200);
	 res.send(posts);
})

server.get("/posts/search", (req, res) => {
     let title = req.query.title;
		 if (title) {
		    filteredPosts = posts.filter((post) => {
						return title === post.title;
					})
			}
      res.status(200);
			res.send(filteredPosts);
		})		


module.exports = { posts, server };
