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

server.post("/api/posts", async (req, res) => {});

server.listen(8000, () => console.log("API listenint on port 8000"));
