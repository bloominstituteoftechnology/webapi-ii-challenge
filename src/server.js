const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  { 
    title: "Dummy Post from server",
    contents: "Content",
    id: "1"
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
server.use(cors());

// TODO: your code to handle requests

// - If the client provides the query-string parameter `term`, filter the posts to
//   those that have the `term` in their `title` or `contents` (or both), and
//   send down those posts in a JSON response.

// - Otherwise, send down the full array of posts as a JSON response.

server.get('/posts', (req, res) => {
  const term = req.query.term;

  if (term) {
    const searchResults = posts.filter(post => {
      return post.title.indexOf(term) !== -1 || post.contents.indexOf(term) !== -1;
    });
    res.json(searchResults);
  } else {
    res.json(posts);
  }
});

// - Ensure that the client provides both `title` and `contents` in the request
//   body. If any of these don't exist, send an object of the form `{ error: "Error
//   message" }` as a JSON response. Make sure to respond with an appropriate
//   status code.

// - If all fields are provided, create a new post object. Assign the post a
//   unique, numeric `id` property that will act as its identifier, and add it to
//   the posts array. Return the newly created post object, with its assigned `id`,
//   to the client in a JSON response.

server.post('/posts', (req, res) => {
  console.log(req.body);
  const { title, contents } = req.body;
  // console.log(req.body);
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR); 
    res.json({ error: "Missing Title or Contents" }); 
  } else {

    const post = {}
    post.id = posts.length + 1;
    post.title = title;
    post.contents = contents;

    posts.push(post);
    res.json(post);
  }

});


server.put('/posts', (req, res) => {

  const { id, title, contents} = req.body;

  if(!id || !title || !contents){
    res.status(STATUS_USER_ERROR);
    res.json({error: "Missing id, title or contents"});
  }

  if (id) {
    const postFound = posts.filter((post) => {
      return post.id === id;
    });


    if(postFound.length === 0){
      res.status(STATUS_USER_ERROR);
      res.json({error: "Post not found"});
    }

    if(postFound.length > 0) {
      posts.forEach((post) => {
        if (post.id === id) {
          post.title = title;
          post.contents = contents;
        }
        res.status(200);
        res.json(post);
      });
    }
  }
});


// ### `DELETE /posts`
// When the client makes a `DELETE` request to `/posts`:

// - Ensure that the client provides an `id` in the request body, and that the `id`
//   corresponds to a valid post. If there's an error, send an object of the form
//   `{ error: "Error message" }` as a JSON response. Make sure to respond with an
//   appropriate status code.

// - Remove the post with the given `id` from the array of posts. Return the
//   object `{ success: true }` in a JSON response.


server.delete('/posts', (req, res) => {

  const { id } = req.body;

  if(!id){
    res.status(STATUS_USER_ERROR);
    res.json({error: "Missing id"});
  }

  if (id) {
    posts = posts.filter((post) => {
      return post.id !== id;
    });
    res.status(200);
    res.json({ success: true });
  }
});


module.exports = { posts, server };
