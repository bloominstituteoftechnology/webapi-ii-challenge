const bodyParser = require('body-parser');
const express = require('express');

const STATUS_SUCCESS = 200;  //OK
const STATUS_USER_ERROR = 422; //Unprocessable Entity

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/__', (req, res) => {
  if (!req.___._____) {

    // some code here
  }  else {
    res.status(STATUS_SUCCESS);
    res.send();
  }
});

server.post('/__', (req, res) => {
  if (!req.___._____) {

    // some code here
  }  else {
    res.status(STATUS_SUCCESS);
    res.send();
  }
});

server.put('/__', (req, res) => {
  if (!req.___._____) {

    // some code here
  }  else {
    res.status(STATUS_SUCCESS);
    res.send();
  }
});

server.delete('/__', (req, res) => {
  if (!req.___._____) {

    // some code here
  }  else {
    res.status(STATUS_SUCCESS);
    res.send();
  }
});

module.exports = { posts, server };
