// import database handler
const db = require("./data/db.js");

// import express
const express = require("express");

// import cors
const cors = require("cors");

// instantiate express server
const server = express();

// endpoints

/* 
  add post : TODO: add logic
  --------

  If the request body is missing the title or contents property:
    cancel the request.
    respond with HTTP status code 400 (Bad Request).
    return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

  If the information about the post is valid:
    save the new post the the database.
    return HTTP status code 201 (Created).
    return the newly created post.

  If there's an error while saving the post:
    cancel the request.
    respond with HTTP status code 500 (Server Error).
    return the following JSON object: { error: "There was an error while saving the post to the database" }.
*/

server.post("/api/posts", (req, res) => {});

/*
  get all posts : TODO: add logic
  -------------

  If there's an error in retrieving the posts from the database:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The posts information could not be retrieved." }.
*/

server.get("/api/posts", (req, res) => {});

/*
  get a single post dependant upon id TODO: fill in logic
  -----------------------------------

  If the post with the specified id is not found:
    return HTTP status code 404 (Not Found).
    return the following JSON object: { message: "The post with the specified ID does not exist." }.

  If there's an error in retrieving the post from the database:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The post information could not be retrieved." }.
*/

server.get("/api/posts/:id", (req, res) => {});

/*
  delete a single post besed upon id TODO: fill in logic
  ----------------------------------

  If the post with the specified id is not found:
    return HTTP status code 404 (Not Found).
    return the following JSON object: { message: "The post with the specified ID does not exist." }.
    
  If there's an error in removing the post from the database:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The post could not be removed" }.
*/

server.delete("/api/posts/:id", (req, res) => {});

/*
  edit a single post based upon id TODO: fill in logic
  --------------------------------

  If the post with the specified id is not found:
    return HTTP status code 404 (Not Found).
    return the following JSON object: { message: "The post with the specified ID does not exist." }.

  If the request body is missing the title or contents property:
    cancel the request.
    respond with HTTP status code 400 (Bad Request).
    return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

  If there's an error when updating the post:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The post information could not be modified." }.

  If the post is found and the new information is valid:
    update the post document in the database using the new information sent in the reques body.
    return HTTP status code 200 (OK).
    return the newly updated post.
*/

server.put("/api/posts/:id", (req, res) => {});

server.listen(8000, () => console.log("API listenint on port 8000"));
