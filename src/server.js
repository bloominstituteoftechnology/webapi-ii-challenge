const bodyParser = require('body-parser');
const express = require('express');
const STATUS_USER_ERROR = 422;

const posts = [
  {
    title: "",
    content: "",
  },

];
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
// TODO: your code to handle requests
server.get("/posts", (req, res) => {
  if (req.query.term) {
    let searchPosts = []; // initialize arr. for searched query
    // if the post's title OR it's contents = query then push only those posts to the searchPosts array.
    posts.forEach(post => {
      if (post.title.includes(req.query) || post.contents.include(req.query))
        searchPosts.push(post)
    })
    return res.send(searchPosts);
    //otherwise just send all posts
  } else res.send(posts);
});

//POST request
let counter = 1; // id counter
let addPost = {}; // new post object arr.

server.post('/posts', (req, res) => {
  const { title, contents } = req.body; // both fields req.
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR); //return err. if client does not provide both fields
    res.json({ error: 'Error Message' });
  } else { // otherwise increment ID, add a new post and return a OK status 
    counter++;
    const addPost = {
      id: counter,
      title: title,
      contents: contents
    };
    posts.push(addPost);
    res.status(200);
    res.json(addPost);

  }
});

server.put('/posts/', (req, res) => {
  const { id, title, contents } = req.body;
  if (!title || !content || !id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Error Message' });

  } else {
    const newPost = {
      id, title, contents
    };
    posts[posts.findIndex(post => post.id === id)] = newPost;
    res.status(200);
    res.json(newPost);
  }


});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Error Message' });

  } else {
    posts.splice(post.findIndex(post => post.id === id), 1);
    res.status(200);
    res.json({ success: true });
  }
});





module.exports = { posts, server };
