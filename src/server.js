const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// Get /posts
//Query-string parameter term
//filter the posts to those that have term in their title or contents or both
//send down searched posts in a JSON response
//Otherwise, send down the full array of posts as a JSON response

// POST /posts
//Require client: title || contents in req body
// JSON error object - needs appropriate status code
//If all correct, create new post object
//Post needs unique, numeric id and add to post array
//return newly created post object with assigned id to client in a JSON response


module.exports = { posts, server };
