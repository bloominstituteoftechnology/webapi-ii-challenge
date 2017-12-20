const { server } = require("./server.js");
const { Posts } = require("./server.js");

const posts = new Posts();

const RESPONSE_CODES = {
  USER_ERROR: 422,
  SUCCESSS: 200
};

server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term !== undefined) {
    const response = posts.search(term);
    res.status(RESPONSE_CODES.SUCCESSS).json(response);
    return;
  }
  const response = posts.get();
  res.status(RESPONSE_CODES.SUCCESSS).json(response);
});

server.post("/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    let errors = [];
    if (!title) {
      errors = [...errors, { error: "You must provide a title" }];
    }
    if (!contents) {
      errors = [...errors, { error: "You must provide a content body" }];
    }
    res.status(RESPONSE_CODES.USER_ERROR).json(errors);
    return;
  }
  posts.add({ title, contents });
  res.status(RESPONSE_CODES.SUCCESSS).json(posts.get());
});

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;
  if (id === undefined) {
    let errors = [];
    const error = { error: "You must provide an id" };
    errors = [...errors, error];
    res.status(RESPONSE_CODES.USER_ERROR).json(errors);
    return;
  }
  const exists = posts.exists(id);

  if(!exists) {
    res
    .status(RESPONSE_CODES.USER_ERROR)
    .json([{ error: "Post id does not exist" }]);
    return;
  }

  if (title || contents) {
    const body = {};

    if (title) {
      body.title = title;
    }
    if (contents) {
      body.contents = contents;
    }

    posts.update(id, body);

    res.status(RESPONSE_CODES.SUCCESSS).json({ success: true });
    return;
  }
  res.status(RESPONSE_CODES.USER_ERROR).json([{ error: 'You need to provide a bobdy' }]);
});

server.delete("/posts", (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    const errors = [
      {
        error: "You must provie an id"
      }
    ];
    res.status(RESPONSE_CODES.USER_ERROR).json(errors);
    return;
  }
  const exists = posts.exists(id);
  if (exists) {
    posts.delete(id);
    res.status(RESPONSE_CODES.SUCCESSS).json({ SUCCESSS: true });
  } else {
    res
      .status(RESPONSE_CODES.USER_ERROR)
      .json([{ error: "Post id does not exist" }]);
  }
});
server.listen(3000);
