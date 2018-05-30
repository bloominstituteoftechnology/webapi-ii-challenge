const express = require("express");
const db = require("./data/db");
const cors = require("cors");
const port = 5555;
const server = express();

server.use(express.json());
server.use(cors({ origin: "http://localhost:5555" }));

const sendError = (statusCode, message, res) => {
  res.status(statusCode).json({ errorMessage: message });
  return;
};

const customLogger = (req, res, next) => {
  const ua = req.headers["post-agent"];
  console.log(req.headers);
  const { path } = req;
  const timeStamp = Date.now();
  const log = { path, ua, timeStamp };
  const stringLog = JSON.stringify(log);
  console.log(stringLog);
  next(); 
};

server.get("/", (req, res) => {
  res.send("Hello from express");
});

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json({ posts });
    })
    .catch(error => {
      sendError(500, "The posts information could no tbe retrieved", res);
      return;
    });
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    sendError(400, "Must provide title and contents", res);
    return;
  }
  db.insert({ title, contents })
    .then(response => {
    //   res.status(201).send(response);
    //   console.log(response);
        db.findById(response.id)
            .then(post => {
          res.json({ post });
        });
    })
    .catch(error => {
      sendError(400, error, res);
      return;
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params; // pull id off of req.params;
  db
    .findById(id) // invoke proper db.method(id) passing it the id.
    .then(post => {
      if (post.length === 0) {
        sendError(404, `Post with that id could not found`, res);
        return;
      }
      res.json({ post });
    })
    .catch(error => {
      sendError(500, "Error looking up post", res);
      return;
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
//   const deletedPost = db.findById(id).then(post => res.json({post}))
//   console.log(deletedPost)
  db
    .remove(id)
    .then(post => {
      if (post === 0) {
        sendError(404, `Post with that id could not found`, res);
        return;
      }
        res.json({ post });

    //   db.findById(id).then(user => {
        // console.log(user);
        // if (user.length === 0) {
        //   sendError(404, "User with that id not found", res);
        //   return;
        // }
        // res.json( {deletedPost} );
      
    })
    .catch(error => {
      console.log(error);
      sendError(500, "Error looking up post", res);
      return;
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents) {
    sendError(400, "Must provide title and contents", res);
    return;
  }
  db
    .update(id, { title, contents })
    .then(response => {
      if (response == 0) {
        sendError(404, `Post with that id could not found`, res);
        return;
      }
      db.findById(id).then(post => {
        console.log(post);
        if (post.length === 0) {
          sendError(404, "Post with that id not found", res);
          return;
        }
        res.json({ post });
      });
    })
    .catch(message => {
      sendError(400, message, res);
      return;
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
