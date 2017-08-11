const bodyParser = require('body-parser');
const express = require('express');

const server = express();
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
// create a id that is modifiable
let giveId = 0;

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const queryString = (term, searchStr) => {
  // create new variables so I don't modify the ones passed
  const sStr = searchStr;
  const sTerm = term;
  //Create an array from the string we are searching through
  const searchArr = sStr.split(' ');
  // returns true or false based on whether or not the term is in the array
  for (let i = 0; i < searchArr.length; i++) {
    if (searchArr[i] === sTerm) { return true; }
  }
  return false;
};
// TODO: your code to handle requests


server.get('/posts', (req, res) => {
  // this is what a query looks like localhost:3000/posts?term='dog'
  // this is how to access this query req.query.term
  // this is a what a parameter looks like /movies/:id
  // to pass to the parameter would be /movies/2
  // to access the params would be req.params.id
  const term = req.query.term;
  //checks if term exists then filters the old array to see if the term matches the title or contents
  //and passes that back to a new array filteredArr
  if (term) {
    const filterArr = posts.filter((post) => {
      return queryString(term, post.title) || queryString(term, post.contents);
    });
    if (filterArr.length === 0) {
      //if the term was not actually present returns a error
      res.status(404);
      res.json({ error: 'No term present' });
    }
    //if succesful returns filterArr
    res.json(filterArr);
  } 
  res.json(posts);
});
server.post('/posts', (req, res) => {
  //starts with error checking for the title and contents
  const title = req.body.title;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a title' });
    return;
  }
  const contents = req.body.contents;
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add contents' });
    return;
  }
  //create a new post to be sent to posts array
  const newPost = { id: giveId, title, contents };
  //push post to array
  posts.push(newPost);
  res.json(newPost);
  //increment the giveId variable so that each post has a different id
  giveId++;
});

server.put('/posts', (req, res) => {
  // ensures id, title, and contents sends error object if error
  //all bad!!!!!
  //creates variables that link to a place with the same name compare to the other instances where the variables have been created
  const { id, title, contents } = req.body;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a title' });
    return;
  }
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add contents' });
    return;
  }
  // find the index of the given id in the array
  const idex = posts.findIndex((post) => {
    return post.id == id;
  });
  // produce error if the id is not present
  if (idex < 0) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'input valid id' });
    return;
  }
  //construct a new post out of the id title and contents variables
  const newPost = {id, title, contents}
  //removes the post at the id index and inserts the new post
  posts.splice(idex, 1, newPost);
  res.json(newPost);
  // if the id doesn't correspond give error

  // respond with the updated post object in json
});
server.delete('/posts', (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide id' });
    return;
  }
  //finds the index in the array where the id is present
  const idex = posts.findIndex((post) => {
    return post.id == id;
  });
  //findIndex either returns a number or -1 if it doesnt find anything return errorcode if its -1
  if (idex < 0) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'input valid id' });
    return;
  }
  //remove the given id index
  posts.splice(idex, 1);
  res.json({ success: true });
  // make sure an id is provided to delete and that corresponds to a comment
  // throw error if it doesn't

  // remove the post withh the given 'id' from the array of posts
});


module.exports = { posts, server };
