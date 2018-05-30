const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");

const server = express();
const port = 6666;
const url = "/api/posts";

server.use(express.json());
server.use(cors());

server.get(url, (req, res) => {
  db
    .find()
    .then(response => {
      console.log("response", response);

      /**
       * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a fail in the server fetching the data with 'db.find()' method.
       * */
      // return new Promise.reject();

      res.json(response);
    })
    .catch(e => {
      console.log("error", e);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get(`${url}/:id`, (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(response => {
      // console.log("response", response, id);
      // If ID is not found
      response.length === 0 &&
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      // If ID is found --> Get user and return it whitin the response
      return db.find().then(response => {
        /**
         * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a fail in the server fetching the data with 'db.find()' method.
         * */
        // return new Promise.reject();

        // Send the user info
        res.json(response.filter(user => user.id === Number(id))[0]);
      });
    })
    .catch(e => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// Midlewear for POST endpoint
function contentValid(req, res, next) {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    next();
  }
}
function insertPost(req, res, next) {
  const { title, contents } = req.body;
  db
    .insert({ title, contents })
    .then(response => {
      const { id } = response;
      id && next();
    })
    .catch(e => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
}
server.post(url, contentValid, insertPost, (req, res) => {
  console.log(req.body);
  db
    .find()
    .then(response => {
      res.status(201).json(response.slice(-1));
    })
    .catch(e => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

server.listen(port, () => console.log("Server running on port %s ", port));
