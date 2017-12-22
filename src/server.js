const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    title: 'The post title',
    contents: 'The post contents'
  },
  {
    title: 'an apple a day',
    contents: 'x'
  },
  {
    title: 'yasin learns filter()',
    contents: 'a book about yasins misadventures'
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/', (req, res) => {
  res.send('<h1>welcome to your express server</h1>');
});

server.get('/posts', (req, res) => {
  // console.log(req.query);
  const query = req.query.name;
  console.log("query is " + query);
  if (query === undefined) {
    console.log('the user did not submit a query');
    res.status(200).json(posts);
  } else {
    const filteredArray = posts.filter((item) => {
      return (query == item.title || query == item.contents);
    });
    res.status(200).json(filteredArray);
  };
});

server.post('/posts', (req, res) => {
  if (req.body.title == undefined || req.body.contents == undefined) {
    res.status(400).json({ "error": "Error message" });
  }
  id = posts.length;
  req.body.id = posts.length + 1;
  posts.push(req.body);
  res.status(200).json(req.body);
});
// TODO: fix put
server.put('/posts', (req, res) => {
  if (req.body.id == undefined || req.body.title == undefined || req.body.contents == undefined) {
    res.status(400).json({ "error": "Error message" });
  }
  for (i = 0; i < posts.length; i++) {
    if (req.body.id == posts[i].id) {
      res.status(201).json(posts[i]);
    } else {
      posts.push(req.body);
      console.log(posts);
      res.status(200);
    };
  };
});

// TODO: fix delete

module.exports = {
  server
};




//object.values to search in the array for partials


// function search(someText) {
  //   return someText == posts.title || posts.contents;
  // };
  
  // const resultArr = posts.filter(function search(query) {
  //   return someText == posts.title || posts.contents;
  // });
  // const resultArr = posts.filter(search(query));
  // res.status(200).json(resultArr);

// server.get('/api/friends', (req, res) => {
//   res.status(200).json(friends);
// });

// server.get('/api/friends/:id', (req, res) => {
//   const friend = friends.find(f => f.id == req.params.id);
//   res.status(200).json(friend);
// });
// server.post('/api/friends', (req, res) => {
//   console.log(req.body);

//   const friend = req.body;
//   friends.push(friend);
//   res.status(201).json(friends);
// })
