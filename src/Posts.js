class Posts {
  constructor(posts = []) {
    this.posts = posts;
  }

  getPosts() {
    return this.posts;
  }

  addPost(post) {
    this.posts.push(post);
  }

  findPostById(id) {
    return this.posts.find(post => post.id === id);
  }

  containsPost(postToFind) {
    return this.posts.some(post => post.id === postToFind.id);
  }

  updatePost(postWithUpdates) {
    const postIndex = this.posts.findIndex(post => post.id === postWithUpdates.id);
    if (postIndex > -1) {
      this.posts[postIndex] = postWithUpdates;
      return this.posts[postIndex];
    }
  }

  removePostById(id) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex > -1) {
      return this.posts.splice(postIndex, 1);
    }
    return null;
  }

  static isValidPost(post) {
    return ('id' in post && 'title' in post && 'contents' in post);
  }
}

module.exports = Posts;
