const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
	{ title: 'Goals', contents: 'Go to the gym everyday', id: 0 },
	{ title: 'Lambda School', contents: 'Computer Science Academy', id: 1}
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    const termPosts = posts.filter((post) => {
      const postTitle = post.title.split(' ');
      const postContent = post.contents.split(' ');
      return (postTitle.includes(term) || postContent.includes(term));
    });
    if (!termPosts.length) {
      res.status(STATUS_USER_ERROR);
      res.send({ error: `No posts were found using the term (${term})` });
    } else {
      res.send({ posts: termPosts });
    }
  } else {
    res.send({ posts });
  }
});

let postId = 2;

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents, id: postId }
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'Must provide title and contents' });
    return;
  }
  posts.push(newPost);
  postId++;
  res.send({ posts: newPost });
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (id === undefined || !title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "Must provide title, contents, and id" });
    return;
  }
  const findPostById = post => {
    return post.id == id;
	}
  const foundPost = posts.find(findPostById);
  if (!foundPost) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'No post was found by that id' });
  } else {
    foundPost.title = title;
    foundPost.contents = contents;
    res.send(foundPost);
  }
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "Must provide id" });
    return;
  }
  let removedPost = null;
  for(let i = 0; i < posts.length; i++) {
    if (posts[i].id == id) {
      removedPost = posts.splice(i, 1);
      break;
    }
  }
  if (!removedPost) {
  	res.status(STATUS_USER_ERROR);
  	res.send({ error: "Post not found by that id" });
  } else {
    res.send(removedPost);
  }
})

module.exports = { posts, server };








