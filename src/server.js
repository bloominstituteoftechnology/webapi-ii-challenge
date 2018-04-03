const express = require('express');

const server = express();
const posts = [];

server.use(express.json());

server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    const tmp = posts.filter(({ contents, title }) => title.includes(term) || contents.includes(term));
    if (tmp.length > 0) return res.status(200).json(tmp);
    return res.status(422).json({ error: `No matching post with "${term}" found.` });
  }
  res.status(200).json(posts);
});

server.post('/posts', (req, res) => {
  const id = posts.length + 1;
  const { contents, title } = req.body;
  if (!title || !contents) return res.status(422).json({ error: 'Please provide title and content.' });
  posts.push({ id, title, contents });
  res.status(200).json({ id, title, contents });
});

server.put('/posts', (req, res) => {
  const { contents, id, title } = req.body;
  if (!id || !title || !contents) return res.status(422).json({ error: 'Please provide id, title and content to update post.' });
  if (id) {
    posts.forEach((post) => {
      if (id === post.id) {
        post.title = title;
        post.contents = contents;
        res.status(200).json(post);
      }
    });
  }
  res.status(422).json({ error: 'Please provide a valid post id.' });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(422).json({ error: 'Please provide post id to delete post.' });
  if (id) {
    posts.forEach((post, i) => {
      if (+id === post.id) {
        posts.splice(i, 1);
        res.status(200).json({ success: true });
      }
    });
  }
  res.status(422).json({ error: `Post ${id} not found.` });
});

module.exports = { posts, server };
