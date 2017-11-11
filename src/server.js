const express = require('express');
 
 const STATUS_USER_ERROR = 422;
 const PAGE_NOT_FOUND = 404;
 
 const handlePageNotFoundError = (msg, res) => {
   res.status(PAGE_NOT_FOUND);
   res.json(msg);
   return;
 };
 const handleUserError = (msg, res) => {
   res.status(STATUS_USER_ERROR);
   res.json(msg);
   return;
 };
 
 // This array of posts persists in memory across requests. Feel free
 // to change this to a let binding if you need to reassign it.
 const posts = [];
 
 const posts = [
   { id: 1, title: 'Post1', contents: 'Content for Post1' },
   { id: 2, title: 'Post2', contents: 'Content for Post2' },
   { id: 3, title: 'Post3', contents: 'Content for Post3' },
   { id: 4, title: 'Post4', contents: 'Content for Post4' },
   { id: 5, title: 'Post5', contents: 'Content for Post5' },
 ];
 const server = express();
 // to enable parsing of json bodies for post requests
 server.use(bodyParser.json());
 
 // TODO: your code to handle requests
 const checkForPost = (arr, post) => {
   let isHere = false;
   for (let i = 0; i < arr.length; i++) {
     if (arr[i] === post) {
       isHere = true;
       return isHere;
     }
   }
   return isHere;
 };
 server.post('/create', (req, res) => {
   const title = req.body.title;
   const contents = req.body.contents;
   const post = {};
   post.id = posts.length + 1;
   post.title = title;
   post.contents = contents;
   if (!title || !contents) {
     return handleUserError(
       { error: 'Please enter a title and some content!' },
       res,
     );
   }
   posts.push(post);
   res.json({ posts });
 });
 
 server.get('/posts', (req, res) => {
   const id = req.query.id;
   const thisPost = posts[id - 1];
   if (id) {
     res.json({ thisPost });
   }
   res.json({ posts });
 });
 
 server.put('/posts', (req, res) => {
   const id = req.query.id;
   const thisPost = posts[id - 1];
   if (!id) {
     return handleUserError({ error: 'Please enter ID of a single post!' }, res);
   }
   if (checkForPost(posts, thisPost) !== true) {
     return handlePageNotFoundError(
       { error: 'Please enter a valid post ID!' },
       res,
     );
   }
   if (!req.body.title || !req.body.contents) {
     return handleUserError(
       { error: 'Make sure you have a title and some content!' },
       res,
     );
   }
   const post = thisPost;
   post.title = req.body.title;
   post.contents = req.body.contents;
   res.json({ message: 'Post Updated!' });
 });
 
 server.delete('/posts', (req, res) => {
   const id = req.query.id;
   const thisPost = posts[id - 1];
   if (checkForPost(posts, thisPost) !== true) {
     return handlePageNotFoundError(
       { error: 'Please enter a valid post ID!' },
       res,
     );
   }
   if (!id) {
     return handleUserError({ error: 'Please enter ID of a single post!' }, res);
   }
   posts.splice(id - 1, 1);
   res.json({ success: true });
 });

module.exports = { posts, server };