import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [{ title: 'Loading', contents: 'Just wait!' }]
    };
  }

  URL = 'http://localhost:3333/posts';

  /* Axios requests */

  getPosts = () => {
    axios.get(this.URL)
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.error(err));
  };

  getPost = id => {
    axios.get(`${this.URL}/${id}`)
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.error(err));
  };

  addPost = () => {
    const { title, contents } = this.state;
    axios.post(this.URL, { title, contents })
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.error(err));
  };

  deletePost = id => {
    axios.delete(`${this.URL}/${id}`)
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.error(err));
  };

  updatePost = id => {
    const { title, contents } = this.state;
    axios.put(`${this.URL}/${id}`, { title, contents })
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.error(err));
  };

  /* Form methods */

  onAddSubmit = e => {
    e.preventDefault();
    this.addPost();
  };

  onEditSubmit = (e, id) => {
    e.preventDefault();
    this.updatePost(id)
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* Lifecycle methods */

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Express Posts</h1>
        </header>
        <div className="posts">
          {this.state.posts.map((post, ind) => {
            const { title, contents, id } = post;
            return (
              <div className="post" onClick={() => this.getPost(id)} key={ind}>
                <span onClick={() => this.deletePost(id)}>X</span>
                <h4 className="post-title">{title}</h4>
                <p className="post-contents">{contents}</p>
                {this.state.posts.length === 1 ? (
                  <form className="post-form" onSubmit={(e) => this.onEditSubmit(e, id)}>
                    <input name="title" onChange={this.onChange} placeholder="Enter post title..." />
                    <input name="contents" onChange={this.onChange} placeholder="Enter post content..." />
                    <input type="submit" value="Edit post" />
                  </form>
                ) : ''}
              </div>
            );
          })}
        </div>
        {this.state.posts.length !== 1 ? (
          <form className="post-form" onSubmit={this.onAddSubmit}>
            <input name="title" onChange={this.onChange} placeholder="Enter post title..." />
            <input name="contents" onChange={this.onChange} placeholder="Enter post content..." />
            <input type="submit" value="Add post" />
          </form>
        ) : ''}
      </div>
    );
  }
}

export default App;
