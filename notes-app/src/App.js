import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = { posts: [], title: "", contents: "" };
  }

  handleInput(e) {
    this.setState(
      { ...this.state, [e.target.name]: e.target.value },
      console.log(this.state)
    );
  }

  getPosts() {
    axios
      .get("http://localhost:80/api/posts")
      .then(response => this.setState({ ...this.state, posts: response.data }))
      .catch(err => console.log(err));
  }
  handleSubmit(e) {
    e.preventDefault();
    const newPost = { title: this.state.title, contents: this.state.contents };
    axios
      .post("http://localhost:80/api/posts", newPost)
      .then(response => {
        this.getPosts();
      })
      .catch(err => console.log(err));

    this.setState({ ...this.state, title: "", contents: "" });
  }
  componentDidMount() {
    // this.getPosts();
  }

  render() {
    console.log(this.state.posts);
    return (
      <div className="App">
        <h1>Posts App</h1>
        <form>
          <input
            onChange={e => this.handleInput(e)}
            value={this.state.title}
            type="text"
            name="title"
            placeholder="Title"
          />
          <input
            onChange={e => this.handleInput(e)}
            value={this.state.contents}
            type="text"
            name="contents"
            placeholder="Contents"
          />
          <button onClick={e => this.handleSubmit(e)}>Submit</button>
        </form>

        <div className="button" onClick={e => this.getPosts()}>
          Get Posts!
        </div>
        <div className="posts-container">
          {this.state.posts.map(post => {
            return (
              <div className="post">
                <a href={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                  <p>{post.contents}</p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
