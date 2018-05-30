const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");

const server = express();
const port = 6666;
const endpoint = "/api/posts";

server.use(express.json());
server.use(cors());

server.get(endpoint, (req, res) => {
  db
    .find()
    .then(response => {
      console.log("response", response);
      
      /**
       * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a fail in the server fetching the data.
       * */
      // return new Promise.reject();
      
      res.json(response);
    })
    .catch(e => {
      console.log("error", e);
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.listen(port, () => console.log("Server running on port %s ", port));
