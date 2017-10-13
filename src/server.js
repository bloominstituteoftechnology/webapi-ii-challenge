const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const checkPostId = (postArr, id) => {
  return postArr.findIndex(post => id === post.id);
};

const invalidId = (res) => {
  return res
    .status(STATUS_USER_ERROR)
    .json({ error: 'Post not found, ensure you entered the correct id' });
};

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    const filteredPosts = posts.filter((post) => {
      const postTitle = post.title.toLowerCase().split(' ');
      const postContent = post.contents.toLowerCase().split(' ');
      return (
        postTitle.includes(term.toLowerCase()) ||
        postContent.includes(term.toLowerCase())
      );
    });
    return res.json(filteredPosts);
  }
  return res.json(posts);
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You must supply a title and content for your post' });
  }
  const post = {
    title,
    contents,
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
  };
  posts.push(post);
  return res.json(post);
});

server.put('/posts', (req, res) => {
  const { title, contents, id } = req.body;
  if (!title || !contents || !id) {
    return res.status(STATUS_USER_ERROR).json({
      error:
        'You must supply a title, content, and id for the post you want to update',
    });
  }

  const postToUpdate = checkPostId(posts, id);

  if (postToUpdate === -1) {
    return invalidId(res);
  }

  posts[postToUpdate] = { title, contents, id };
  return res.json(posts[postToUpdate]);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You must supply an id' });
  }
  const postToDelete = checkPostId(posts, id);

  if (postToDelete === -1) {
    return invalidId(res);
  }

  posts.splice(postToDelete, 1);
  return res.json({ success: true });
});

module.exports = { posts, server };
