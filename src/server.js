const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const request = require('request');

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

server.get('/prices', (req, res) => {
  request('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH,LTC&tsyms=USD', (error, response, body) => {
    res.send(body);
  });
});

server.get('/posts', (req, res) => {
  request('https://swapi.co/api/people', (error, response, body) => {
    res.send(body);
  });
  ///*** OLD CODE ***
  // const term = req.query.term;
  // if (term) {
  //   const searchResults = posts.filter(post => {
  //     return post.title.indexOf(term) !== -1 || post.contents.indexOf(term) !== -1;
  //   });
  //   res.json(searchResults);
  // } else {
  //   res.json(posts);
  // }
});

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
