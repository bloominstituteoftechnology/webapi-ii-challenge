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
server.post('/gues', (req, res) => {
  if (!req.body.letter) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "User must provide a letter"});
  } else if (req.body.letter.length >1) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "User must provide one letter only"});
  } else if (typeof req.body.letter !== 'string') {
    res.status(STATUS_USER_ERROR);
    res.json({error: "Letter must be provided as a string"});
  } else if (guessedLetters[req.body.letter]) {
    res.status(STATUS_USER_ERROR);
    res.json({error: 'The letter "${req.body.letter}" was already guessed'});
  } else {
    guessedLetters[req.body.letter] = true;
    res.status(STATUS_SUCCESS);
    res.send();
  }
});



module.exports = { posts, server };
