// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require("express");

const CORS = require('cors');

const port = 5555;
const server = express();
server.use(express.json());
server.use(CORS({ origin: 'http://localhost:3000' }));

server.get("/", (req, res) => {
  // 1st arg: route where a resource can be interacted with
  // 2nd arg: callback to deal with sending responses, and handling incoming data.
  res.send("Hello from express");
});

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
  };

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
      sendUserError(400, 'Please Make sure to fill out both the Title and Content fields', res);
  }
  db
    .insert({ title, contents })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      sendUserError(400, error, res);
    });
});

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
        sendUserError(500,`The post's information could not be retrieved`, res);
    });
});

server.get("/api/posts/:id", (req, res) => {
  // pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
  const id = req.params.id;
  db
    .findById(id)
    .then(response => {
      if (response.length === 0) {
          sendUserError(404, 'User with that ID not found', res);
          return;
      }
      res.json(response);
    })
    .catch(error => {
      sendUserError(500,`The post with the specified ID does not exist`, res);
    });
});

server.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params;
  db
    .remove(id)
    .then(response => {
      if ( response === 0) {
          sendUserError(404, 'The user with that ID does not exist', res);
          return;
      }
      res.json({ success: `User with id: ${id} removed from system` });
      return
    })
    .catch(error => {
      sendUserError(500, `The user could not be removed`, res);
      return;
    });
});

server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(404, `Must provide title and content`, res);
        return;
    }
    db
    .update(id, { title, contents })
    .then(response => {
        if (response === 0) {
            sendUserError(404, `the User with the specified ID does not exist.`, res);
            return;
        }
        db
        .findById(id)
        .then(response => {
            if (response.length === 0 ) {
                sendUserError(404, `User with that ID was not found`, res);
                return;
            }
            res.json(response);
        })
        .catch(error => {
            sendUserError(500, `Could not find user`, res);
        });
    })
    .catch(error => {
        sendUserError(500, `Database error`, res);
        return;
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
