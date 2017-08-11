server.put('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const ID = req.body.id;
  if (!req.body.id || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'You Must Provide: "id", "title", and "contents"' }); return;
  } for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === ID) {
      posts[i].title = title;
      posts[i].contents = contents;
      res.status(200).json({ title, contents, id: ID }); return;
    }
  } res.status(STATUS_USER_ERROR).json({ error: 'Invaid "id" was given' });
});
