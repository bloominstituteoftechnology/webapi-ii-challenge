// import your node modules
const express = require("express");
const db = require("./data/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

//error constants
const getError = "The information could not be retrieved.";
const notExist = "The post with the specified ID does not exist.";
const formError = "Please provide title and contents for the post.";
const saveError = "There was an error while saving the post to the database";
const editError = "The post information could not be modified.";
const deleteError = "The post could not be removed";

// add your server code starting here

//server port constant
const port = 8000;

//always remember to parse your data
server.use(bodyParser.json());

//to stop cors errors when connecting from localhost (security)
server.use(cors());

//home page route
server.get("/", (req, res) => {
  res.send("<h1> Home Page </h1>");
});

//about page route
server.get("/about", (req, res) => {
  res.send("<h1>About Page </h1>");
});

server.listen(port, () => console.log(`API listenning on port ${port}`));
