const Posts = require('./Posts');

const generateId = ((function generateId() {
  let id = 0;
  return () => id++;
})());

const posts = new Posts([{
  id: generateId(),
  title: 'Test Title',
  contents: 'Test Message'
}]);


function getPosts(req, res) {
  if ('term' in req.query) {
    const filteredPosts = posts.getPosts(req.query.term);
    res.status(200).json(filteredPosts);
  } else {
    res.status(200).json(posts.getPosts());
  }
}

function createPost(req, res) {
  const id = generateId();
  const post = { id, ...req.body };
  if (Posts.isValidPost(post)) {
    posts.addPost(post);
    res.status(200).json(post);
  } else {
    res.status(422).json({ error: 'Error message' });
  }
}

function updatePost(req, res) {
  const post = req.body;
  if (Posts.isValidPost(post) && posts.containsPost(post)) {
    posts.updatePost(post);
    res.status(200).json(post);
  } else {
    res.status(422).json({ error: 'Error message' });
  }
}

function deletePost(req, res) {
  if ('id' in req.body) {
    const id = req.body.id;
    const removedPost = posts.removePostById(id);
    if (removedPost) {
      res.status(200).json({ success: true });
    } else {
      res.status(422).json({ error: 'Error message' });
    }
  } else {
    res.status(422).json({ error: 'Error message' });
  }
}

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  posts
};
