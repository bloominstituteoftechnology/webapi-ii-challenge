/* eslint-disable */
const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const ALL_GOOD = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts',function (req,res){
  const title = req.query.title;
  const contents = req.query.contents;
  if (title || contents) {
    let filteredPosts = posts.filter(post => {
      return (post.title === title || post.contents === contents);
    })
    if (filteredPosts.length > 0) {
      res.status(ALL_GOOD);
      res.json({ filteredPosts });
      return;
    }
  }

  res.status(ALL_GOOD);
  res.json({ posts });
  return;
});

server.post('/posts',function (req,res){
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ err: 'Must provide a title and content' });
    return;
  }
  const newPost = {id, title, contents};
  id++;
  posts.push(newPost);
  res.status(ALL_GOOD);
  res.json({ posts });
  return;
});

server.put('/posts',function (req,res){
  const title = req.body.title;
  const contents = req.body.contents;
  const id = req.body.id;
  console.log(title, contents, id);
  if (!title || !contents || !id) {
    res.status(STATUS_USER_ERROR);
    res.json({ err: 'Must provide a title and content and id' });
    return;

  }
  let updateIndex = posts.findIndex((post) => post.id === id);
  if (updateIndex < 0) { // id doesn't exist
    res.status(STATUS_USER_ERROR);
    res.json({ err: 'Must provide an existing id value' });
    return;
  }
  let updatedPost = {id,title, contents};
  posts[updateIndex] = updatedPost;

  res.status(ALL_GOOD);
  res.json({ posts });
  return;
});

server.delete('/posts',function (req,res){
  const id = req.body.id;

  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ err: 'Must provide an id' });
    return;

  }
  let updateIndex = posts.findIndex((post) => post.id === id);
  console.log('index is ', updateIndex);
  if (updateIndex < 0) { // id doesn't exist
    res.status(STATUS_USER_ERROR);
    res.json({ err: 'Must provide an existing id value' });
    return;
  }
  //posts.pop(updateIndex);
  posts.splice(updateIndex, 1);

  res.status(ALL_GOOD);
  //res.json({ success:true });
  res.json({ posts });
  return;
});

server.listen(3050);
module.exports = { posts, server };
