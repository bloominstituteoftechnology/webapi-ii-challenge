// import your node modules
const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");

const port = 5000;
const server = express();
server.use(express.json()); // This middleware (express.json()) is used to parse data coming in
server.use(cors({ origin: "http://localhost:3000" })); // cors is used to enable communication from other ports/URLs

// add your server code starting here

const sendUserError = (status, message, res) => {
  // This is just a helper method that we'll use for sending errors when things go wrong.
  res.status(status).json({ errorMessage: message });
  return;
};

// const checkIfIdIsValid = postArray => {
//   console.log("toplog", postArray);
//   if (postArray.length === 0) {
//     sendUserError(404, "The post with the specified ID does not exist.", res);
//   }
// };

server.get("/", (req, res) => {
  // 1st arg: route where a resource can be interacted with
  // 2nd arg: callback to deal with sending responses and handle incoming data
  res.send("Hello from express");
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400); //400 === bad request
    res.json({
      errorMessage: "Please provide title and contents for the post."
    });
    //I did it without the custome middleware just to remember how to do it
    return;
  }
  db.insert({ title, contents })
    .then(response => {
      res.status(201); //201=== sucessfully created
      db.findById(response.id).then(post => res.json({ post }));
    })
    .catch(error => {
      sendUserError(
        500,
        "There was an error while saving the post to the database.",
        res
      );
    });
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(postsArray => {
      res.status(200);
      res.json(postsArray);
    })
    .catch(error => {
      sendUserError(500, "The posts information could not be retrieved.", res);
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(postArray => {
      // checkIfIdIsValid(postArray);
      if (postArray.length === 0) {
        sendUserError(
          404,
          "The post with the specified ID does not exist.",
          res
        );
        return;
      }
      res.json({ postArray });
      return;
    })
    .catch(error => {
      sendUserError(500, "The post information could not be retrieved.", res);
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(postArray => {
      // checkIfIdIsValid(postArray);
      if (postArray.length === 0) {
        sendUserError(
          404,
          "The post with the specified ID does not exist.",
          res
        );
        return;
      }
      db.remove(id).then(numberRemoved => {
        console.log(`Post with id: ${id} removed`);
        res.json(postArray);
      });
    })
    .catch(error => sendUserError(500, "The post could not be removed", res));
});

// server.delete("/api/posts/:id", (req, res) => {
//   const { id } = req.params;
//   let deletedPost;
//   db.findById(id).then(post => (deletedPost = post));
//   db
//     .remove(id)
//     .then(posts => {
//       if (posts === 0) {
//         sendUserError(
//           404,
//           "The post with the specified ID does not exist.",
//           res
//         );
//       } else {
//         res.json({ deletedPost });
//       }
//     })
//     .catch(error => {
//       sendUserError(500, "The post could not be removed.", res);
//     });
// });

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents) {
    sendUserError(400, "Please provide title and contents for the post.", res);
  }
  db.findById(id)
    .then(postArray => {
      // checkIfIdIsValid(postArray);
      if (postArray.length === 0) {
        sendUserError(
          404,
          "The post with the specified ID does not exist.",
          res
        );
        return;
      }
      db.update(id, req.body).then(updatedCount => {
        if (updatedCount) {
          res.status(200).json(req.body);
          return;
        }
      });
    })
    .catch(error => {
      sendUserError(500, "The post information could not be modified.", res);
      return;
    });
});

server.listen(port, () => console.log(`\n Server running on port ${port}\n`));
